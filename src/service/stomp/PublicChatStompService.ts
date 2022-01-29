import {
    connectStomp,
    disconnectStomp,
    initConnectedUsers,
    initPublicChat,
    subscribeToConnectedUsers,
    subscribeToPublicChat
} from "./StompService";
import {HEADER_CHATROOM_ID, HEADER_CONNECT_TYPE} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";
import {getStompDispatcher} from "../../event_dispatchers/EventDispatcher";
import {
    PUBLIC_CHAT__INIT_CONNECTED_USERS,
    PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PUBLIC_CHAT__ON_MESSAGE_RECEIVED,
    PUBLIC_CHAT__ON_USER_CONNECTED
} from "../../event_dispatchers/config/stompevents";

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

            initPublicChat((msg) => {
                const pubMessages = JSON.parse(msg.body);
                console.log('init pub messages', pubMessages);
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
