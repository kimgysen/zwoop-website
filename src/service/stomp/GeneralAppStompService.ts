import {connectStomp, disconnectStomp} from "./StompService";
import {HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {StreamTypeEnum, stringFromConnectTypeEnum} from "./types/StreamType";
import {initAppInbox} from "./subscriptions/NotificationSubscriptions";
import {subscribeToInboxUpdates} from "./subscriptions/PostInboxSubscriptions";


interface ConnectGeneralInboxProps {
    jwt: string,
    redirectToLogin: () => void
}

export const connectGeneralApp = ({ jwt, redirectToLogin }: ConnectGeneralInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(StreamTypeEnum.GENERAL_APP),
        }, jwt, (frame) => {
        console.log('connect app inbox success', frame);

        initAppInbox();
        subscribeToInboxUpdates();

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