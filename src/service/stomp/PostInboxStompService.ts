import {connectStomp, disconnectStomp} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {StreamTypeEnum, stringFromConnectTypeEnum} from "./types/StreamType";
import {initAppInbox} from "./subscriptions/NotificationSubscriptions";
import {subscribeToPostUpdates} from "./subscriptions/PostUpdateSubscriptions";
import {initPostInbox, subscribeToInboxUpdates} from "./subscriptions/PostInboxSubscriptions";
import {subscribeToPrivateChatUpdates} from "./subscriptions/PrivateChatSubscriptions";


interface ConnectPostInboxProps {
    postId: string,
    jwt: string,
    router: NextRouter
}

export const connectPostInbox = ({ postId, jwt, router }: ConnectPostInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(StreamTypeEnum.POST_INBOX),
            [HEADER_POST_ID]: postId
        }, jwt, (frame) => {
        console.log('connect post inbox success', frame);

        initAppInbox();

        if (postId) {
            subscribeToPostUpdates(postId);
            initPostInbox(postId);
        }

        subscribeToInboxUpdates();
        subscribeToPrivateChatUpdates();
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