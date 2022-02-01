import {
    connectStomp,
    disconnectStomp,
    initAppInbox,
    initConnectedUsers,
    initPublicChat,
    subscribeToConnectedUsers,
    subscribeToInboxUpdates,
    subscribeToPublicChat
} from "./StompService";
import {HEADER_CHATROOM_ID, HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import {getStompDispatcher} from "../../event_dispatchers/StompDispatcher";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    PUBLIC_CHAT__INIT_CONNECTED_USERS,
    PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PUBLIC_CHAT__ON_MESSAGE_RECEIVED,
    PUBLIC_CHAT__ON_USER_CONNECTED
} from "../../event_dispatchers/config/StompEvents";
import InboxItemReceiveDto from "./receive/inbox/InboxItemReceiveDto";

interface connectPublicChatRoomProps {
    chatRoomId: string,
    jwt: string,
    redirectToLogin: () => void
}

export const connectPublicChatRoom = ({
    chatRoomId, jwt, redirectToLogin }: connectPublicChatRoomProps
) => {

    const stompDispatcher = getStompDispatcher();

    connectStomp(
        {
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.PUBLIC_CHAT),
            [HEADER_CHATROOM_ID]: chatRoomId
        }, jwt,
        (frame) => {
            console.log('Public chat connect success', frame);
            initAppInbox((msg) => {
                const inboxItems = JSON.parse(msg.body);
                stompDispatcher.dispatch(
                    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
                    inboxItems);
            });

            subscribeToInboxUpdates((msg) => {
                const inboxItem = JSON.parse(msg.body) as InboxItemReceiveDto;
                stompDispatcher.dispatch(
                    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
                    inboxItem);
            });

            initPublicChat((msg) => {
                const pubMessages = JSON.parse(msg.body);
                stompDispatcher.dispatch(PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED, pubMessages);
            });

            subscribeToPublicChat(chatRoomId, (msg) => {
                const pubMsg = JSON.parse(msg.body);
                stompDispatcher.dispatch(PUBLIC_CHAT__ON_MESSAGE_RECEIVED, pubMsg);
            });

            initConnectedUsers((msg) => {
                const connectedUsers = JSON.parse(msg.body);
                stompDispatcher.dispatch(PUBLIC_CHAT__INIT_CONNECTED_USERS, connectedUsers)
            });

            subscribeToConnectedUsers(chatRoomId, (msg) => {
                const connectedUsers = JSON.parse(msg.body);
                stompDispatcher.dispatch(PUBLIC_CHAT__ON_USER_CONNECTED, connectedUsers);
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
