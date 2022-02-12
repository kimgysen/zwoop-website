import {connectStomp, disconnectStomp} from "./StompService";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {StreamTypeEnum, stringFromConnectTypeEnum} from "./types/StreamType";
import {
    initPartnerIsWriting,
    initPartnerRead,
    initPrivateChat,
    subscribeToPrivateChatUpdates
} from "./subscriptions/PrivateChatSubscriptions";
import {initAppInbox} from "./subscriptions/NotificationSubscriptions";
import {subscribeToInboxUpdates} from "./subscriptions/PostInboxSubscriptions";
import {subscribeToPostUpdates} from "./subscriptions/PostUpdateSubscriptions";

interface connectPostPrivateChatProps {
    jwt: string,
    postId: string,
    partnerId?: string,
    redirectToLogin: () => void
}

export const connectPostPrivateChat = ({
    postId, jwt, partnerId, redirectToLogin }: connectPostPrivateChatProps) => {
    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(StreamTypeEnum.POST_PRIVATE_CHAT),
            [HEADER_POST_ID]: postId
        }, jwt,
        (frame) => {
            console.log('connect private chat success', frame);

            if (postId) {
                subscribeToPostUpdates(postId);
            }

            if (partnerId) {
                initPrivateChat(partnerId);
                initPartnerRead(partnerId);
                initPartnerIsWriting(partnerId);
            }

            initAppInbox();
            subscribeToInboxUpdates();
            subscribeToPrivateChatUpdates();

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
