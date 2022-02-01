import {
    connectStomp,
    disconnectStomp,
    initAppInbox,
    initPartnerIsWriting,
    initPartnerRead,
    initPrivateChat,
    subscribeToInboxUpdates,
    subscribeToPrivateChatUpdates
} from "./StompService";
import PrivateMessageReceiveDto from "./receive/private_chat/PrivateMessageReceiveDto";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import PartnerReadDto from "./receive/private_chat/PartnerReadDto";
import TypingDto from "./receive/private_chat/TypingDto";
import InboxItemReceiveDto from "./receive/inbox/InboxItemReceiveDto";
import {getStompDispatcher} from "../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    PRIVATE_CHAT__INIT_IS_READ_RECEIVED,
    PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED,
    PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PRIVATE_CHAT__ON_MESSAGE_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED,
    PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../event_dispatchers/config/StompEvents";
import PrivateChatFeatureDto from "./receive/private_chat/PrivateChatFeatureDto";
import {PrivateChatFeatureType} from "./receive/private_chat/PrivateChatFeatureType";

interface connectPrivateChatRoomProps {
    jwt: string,
    postId: string,
    partnerId?: string,
    redirectToLogin: () => void
}

const dispatcher = getStompDispatcher();

export const connectPrivateChat = ({
    postId, jwt, partnerId, redirectToLogin }: connectPrivateChatRoomProps) => {
    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.PRIVATE_CHAT),
            [HEADER_POST_ID]: postId
        }, jwt,
        (frame) => {
            console.log('connect private chat success', frame);
            if (partnerId) {
                initPrivateChat(partnerId, (msg) => {
                    const messages = JSON.parse(msg.body) as PrivateMessageReceiveDto[];
                    dispatcher.dispatch(PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED, messages);
                });

                initPartnerRead(partnerId, (msg) => {
                    const partnerHasRead = JSON.parse(msg.body) as boolean;
                    dispatcher.dispatch(PRIVATE_CHAT__INIT_IS_READ_RECEIVED, partnerHasRead);
                });

                initPartnerIsWriting(partnerId, (msg) => {
                    const partnerIsWriting = JSON.parse(msg.body) as boolean;
                    dispatcher.dispatch(PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED, partnerIsWriting);
                });
            }

            initAppInbox((msg) => {
                const inboxItems = JSON.parse(msg.body);
                dispatcher.dispatch(
                    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
                    inboxItems);
            });

            subscribeToInboxUpdates((msg) => {
                const inboxItem = JSON.parse(msg.body) as InboxItemReceiveDto;
                dispatcher.dispatch(
                    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
                    inboxItem);
            });

            subscribeToPrivateChatUpdates((msg) => {
                const dto = JSON.parse(msg.body) as PrivateChatFeatureDto<any>;
                console.log('dto', dto);
                switch (dto.featureType) {
                    case PrivateChatFeatureType.PRIVATE_MESSAGE:
                        dispatcher.dispatch(PRIVATE_CHAT__ON_MESSAGE_RECEIVED, dto.featureDto);
                        break;

                    case PrivateChatFeatureType.PARTNER_READ:
                        const partnerReadDto: PartnerReadDto = dto.featureDto;
                        console.log('dispatch partner read', partnerReadDto);
                        dispatcher.dispatch(
                            PRIVATE_CHAT__ON_READ_RECEIVED + `__${partnerReadDto.postId}_${ partnerReadDto.partnerId }`,
                            dto.featureDto as PartnerReadDto
                        );
                        break;

                    case PrivateChatFeatureType.START_TYPING:
                        const startTypingDto: TypingDto = dto.featureDto;
                        dispatcher.dispatch(
                            PRIVATE_CHAT__ON_START_TYPING_RECEIVED + `__${startTypingDto.postId}_${ startTypingDto.partnerId }`,
                            dto.featureDto as TypingDto
                        );
                        break;

                    case PrivateChatFeatureType.STOP_TYPING:
                        const stopTypingDto: TypingDto = dto.featureDto;
                        dispatcher.dispatch(
                            PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + `__${stopTypingDto.postId}_${ stopTypingDto.partnerId }`,
                            dto.featureDto as TypingDto
                        );
                        break;
                }

            });

        },
        (frame) => {
            console.log('error frame', frame);
            if (frame.headers.message.includes('ExpiredJwtException')) {
                // TODO: Add proper handling when jwt expired
                disconnectStomp();
                redirectToLogin();
            }
        },
        (frame) => {
            console.log('disconnect');
        })
}
