import {
    connectStomp,
    disconnectStomp,
    initAppInbox,
    initPostInbox,
    subscribeToInboxUpdates,
    subscribeToPrivateChatUpdates
} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import PartnerReadDto from "./receive/private_chat/PartnerReadDto";
import TypingDto from "./receive/private_chat/TypingDto";
import {getStompDispatcher} from "../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    POST_INBOX__ON_INBOX_UPDATE_RECEIVED,
    POST_INBOX__ON_INIT_ITEMS_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED,
    PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../event_dispatchers/config/StompEvents";
import PrivateChatFeatureDto from "./receive/private_chat/PrivateChatFeatureDto";
import {PrivateChatFeatureType} from "./receive/private_chat/PrivateChatFeatureType";


interface ConnectPostInboxProps {
    postId: string,
    jwt: string,
    router: NextRouter
}

const stompDispatcher = getStompDispatcher();


export const connectPostInbox = ({ postId, jwt, router }: ConnectPostInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.POST_INBOX),
            [HEADER_POST_ID]: postId
        }, jwt, (frame) => {
        console.log('connect post inbox success', frame);
        initAppInbox((msg) => {
            const inboxItems = JSON.parse(msg.body);
            stompDispatcher.dispatch(APP_INBOX__ON_INIT_ITEMS_RECEIVED, inboxItems);
        });

        subscribeToInboxUpdates((msg) => {
            const inboxItem = JSON.parse(msg.body);
            stompDispatcher.dispatch(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, inboxItem);
            stompDispatcher.dispatch(POST_INBOX__ON_INBOX_UPDATE_RECEIVED, inboxItem);
        });

        initPostInbox(postId, (msg) => {
            const inboxItems = JSON.parse(msg.body);
            stompDispatcher.dispatch(POST_INBOX__ON_INIT_ITEMS_RECEIVED, inboxItems);
        });

            subscribeToPrivateChatUpdates((msg) => {
                const privateChatFeatureDto = JSON.parse(msg.body) as PrivateChatFeatureDto<any>;
                switch (privateChatFeatureDto.featureType) {
                    case PrivateChatFeatureType.PARTNER_READ:
                        const partnerReadDto: PartnerReadDto = privateChatFeatureDto.featureDto;
                        stompDispatcher.dispatch(
                            PRIVATE_CHAT__ON_READ_RECEIVED + `__${partnerReadDto.postId}_${ partnerReadDto.partnerId }`,
                            privateChatFeatureDto.featureDto as PartnerReadDto
                        );
                        break;

                    case PrivateChatFeatureType.START_TYPING:
                        const startTypingDto: TypingDto = privateChatFeatureDto.featureDto;
                        stompDispatcher.dispatch(
                            PRIVATE_CHAT__ON_START_TYPING_RECEIVED + `__${startTypingDto.postId}_${ startTypingDto.partnerId }`,
                            privateChatFeatureDto.featureDto as TypingDto
                        );
                        break;

                    case PrivateChatFeatureType.STOP_TYPING:
                        const stopTypingDto: TypingDto = privateChatFeatureDto.featureDto;
                        stompDispatcher.dispatch(
                            PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + `__${stopTypingDto.postId}_${ stopTypingDto.partnerId }`,
                            privateChatFeatureDto.featureDto as TypingDto
                        );
                        break;
                }

            });
    },
    (frame) => {
        if (frame.headers.message.includes('ExpiredJwtException')) {
            // TODO: Add proper handling when jwt expired
            disconnectStomp();
            router.push('/login');
        }
    },
    (frame) => {
        console.log('disconnect');
    });
}