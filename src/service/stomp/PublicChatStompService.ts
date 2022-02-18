import {connectStomp, disconnectStomp} from "./StompService";
import {HEADER_CHATROOM_ID, HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {StreamTypeEnum, stringFromConnectTypeEnum} from "./types/StreamType";
import {
    initConnectedUsers,
    initPublicChat,
    subscribeToConnectedUsers,
    subscribeToPublicChat
} from "./subscriptions/PublicChatSubscriptions";
import {initAppInbox, subscribeToNotifications} from "./subscriptions/NotificationSubscriptions";
import {subscribeToInboxUpdates} from "./subscriptions/PostInboxSubscriptions";

interface connectPublicChatRoomProps {
    chatRoomId: string,
    jwt: string,
    redirectToLogin: () => void
}

export const connectPublicChatRoom = ({
    chatRoomId, jwt, redirectToLogin }: connectPublicChatRoomProps
) => {

    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(StreamTypeEnum.TAG_PUBLIC_CHAT),
            [HEADER_CHATROOM_ID]: chatRoomId
        }, jwt,
        (frame) => {
            console.log('Public chat connect success', frame);

            if (chatRoomId) {
                subscribeToPublicChat(chatRoomId);
                subscribeToConnectedUsers(chatRoomId);
            }

            initAppInbox();
            initPublicChat();
            initConnectedUsers();

            subscribeToInboxUpdates();
            subscribeToNotifications();
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
