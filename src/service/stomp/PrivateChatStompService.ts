import {
    connectStomp,
    disconnectStomp,
    initAppInbox,
    initPartnerIsWriting,
    initPartnerRead,
    initPrivateChat,
    subscribeToInboxUpdates,
    subscribeToPartnerRead,
    subscribeToPrivateChat,
    subscribeToStartTyping,
    subscribeToStopTyping
} from "./StompService";
import PrivateMessageReceiveDto from "./receive/PrivateMessageReceiveDto";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import PartnerReadDto from "./receive/PartnerReadDto";
import TypingDto from "./receive/TypingDto";
import InboxItemReceiveDto from "./receive/InboxItemReceiveDto";
import {getStompDispatcher} from "../../event_dispatchers/EventDispatcher";
import {
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    PRIVATE_CHAT__INIT_IS_READ_RECEIVED,
    PRIVATE_CHAT__INIT_IS_WRITING_RECEIVED,
    PRIVATE_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PRIVATE_CHAT__ON_MESSAGE_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED, PRIVATE_CHAT__ON_START_TYPING_RECEIVED, PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../event_dispatchers/config/stompevents";

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
                    APP_INBOX__ON_INBOX_UPDATE_RECEIVED + `__${ inboxItem.postId }_${ inboxItem.partnerId }`,
                    inboxItem);
            });

            subscribeToPrivateChat((msg) => {
                const privateMessageDto = JSON.parse(msg.body) as PrivateMessageReceiveDto;
                dispatcher.dispatch(PRIVATE_CHAT__ON_MESSAGE_RECEIVED,
                    privateMessageDto);
            });

            subscribeToPartnerRead((msg) => {
                const partnerReadDto = JSON.parse(msg.body) as PartnerReadDto;
                dispatcher.dispatch(
                    PRIVATE_CHAT__ON_READ_RECEIVED + `__${partnerReadDto.postId}_${ partnerReadDto.partnerId }`,
                    partnerReadDto);
            });

            subscribeToStartTyping((msg) => {
                const typingDto = JSON.parse(msg.body) as TypingDto;
                dispatcher.dispatch(
                    PRIVATE_CHAT__ON_START_TYPING_RECEIVED + `__${typingDto.postId}_${ typingDto.partnerId }`,
                    typingDto);
            });

            subscribeToStopTyping((msg) => {
                const typingDto = JSON.parse(msg.body) as TypingDto;
                dispatcher.dispatch(PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + `__${typingDto.postId}_${ typingDto.partnerId }`,
                    typingDto);
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
