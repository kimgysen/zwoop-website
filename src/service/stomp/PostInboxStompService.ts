import {
    connectStomp,
    disconnectStomp,
    initAppInbox,
    initPostInbox,
    subscribeToInboxUpdates,
    subscribeToPartnerRead,
    subscribeToStartTyping,
    subscribeToStopTyping
} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import PartnerReadDto from "./receive/PartnerReadDto";
import TypingDto from "./receive/TypingDto";
import {getStompDispatcher} from "../../event_dispatchers/EventDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    POST_INBOX__ON_INBOX_UPDATE_RECEIVED,
    POST_INBOX__ON_INIT_ITEMS_RECEIVED,
    PRIVATE_CHAT__ON_READ_RECEIVED,
    PRIVATE_CHAT__ON_START_TYPING_RECEIVED, PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED
} from "../../event_dispatchers/config/stompevents";


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

        subscribeToPartnerRead((msg) => {
            const partnerReadDto = JSON.parse(msg.body) as PartnerReadDto;
            stompDispatcher.dispatch(
                PRIVATE_CHAT__ON_READ_RECEIVED + `__${partnerReadDto.postId}_${ partnerReadDto.partnerId }`,
                partnerReadDto);
        });

        subscribeToStartTyping((msg) => {
            const typingDto = JSON.parse(msg.body) as TypingDto;
            stompDispatcher.dispatch(
                PRIVATE_CHAT__ON_START_TYPING_RECEIVED  + `__${typingDto.postId}_${ typingDto.partnerId }`,
                typingDto);
        });

        subscribeToStopTyping((msg) => {
            const typingDto = JSON.parse(msg.body) as TypingDto;
            stompDispatcher.dispatch(
                PRIVATE_CHAT__ON_STOP_TYPING_RECEIVED + `__${typingDto.postId}_${ typingDto.partnerId }`,
                typingDto);
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