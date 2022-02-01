import {connectStomp, disconnectStomp, initAppInbox, subscribeToInboxUpdates} from "./StompService";
import {HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import InboxItemReceiveDto from "./receive/inbox/InboxItemReceiveDto";
import {getStompDispatcher} from "../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../event_dispatchers/config/StompEvents";


interface ConnectGeneralInboxProps {
    jwt: string,
    redirectToLogin: () => void
}

const stompDispatcher = getStompDispatcher();

export const connectGeneralApp = ({ jwt, redirectToLogin }: ConnectGeneralInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.GENERAL_APP),
        }, jwt, (frame) => {
        console.log('connect app inbox success', frame);
        initAppInbox((msg) => {
            const inboxItems = JSON.parse(msg.body);
            stompDispatcher.dispatch(APP_INBOX__ON_INIT_ITEMS_RECEIVED, inboxItems);
        });

        subscribeToInboxUpdates((msg) => {
            const inboxItem = JSON.parse(msg.body) as InboxItemReceiveDto;
            stompDispatcher.dispatch(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, inboxItem);
        });
    },
    (frame) => {
        if (frame.headers.message.includes('ExpiredJwtException')) {
            // TODO: Add proper handling when jwt expired
            disconnectStomp();
            redirectToLogin();
        }
    },
    (frame) => {
        console.log('disconnect');
    });
}