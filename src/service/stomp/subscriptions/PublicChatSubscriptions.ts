import {getStompClient} from "../StompService";
import {
    PUBLIC_CHAT__INIT_CONNECTED_USERS,
    PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED,
    PUBLIC_CHAT__ON_MESSAGE_RECEIVED,
    PUBLIC_CHAT__ON_USER_CONNECTED
} from "../../../event_dispatchers/config/StompEvents";
import {dispatchStompMessage} from "./SubscriptionUtil";


// Public chat
export const initPublicChat = () => {
    getStompClient()
        .subscribe(`/app/chatroom.old.messages`, (msg) => {
            dispatchStompMessage(PUBLIC_CHAT__ON_INIT_MESSAGES_RECEIVED, msg);
        });
}

export const subscribeToPublicChat = (chatRoomId: string) => {
    getStompClient()
        .subscribe(`/topic/${ chatRoomId }.chatroom.messages`, (msg) => {
            dispatchStompMessage(PUBLIC_CHAT__ON_MESSAGE_RECEIVED, msg);
        });
}

export const initConnectedUsers = () => {
    getStompClient()
        .subscribe(`/app/chatroom.connected.users`, (msg) => {
            dispatchStompMessage(PUBLIC_CHAT__INIT_CONNECTED_USERS, msg)
        });
}

export const subscribeToConnectedUsers = (chatRoomId: string) => {
    getStompClient()
        .subscribe(`/topic/${ chatRoomId }.connected.users`, (msg) => {
            dispatchStompMessage(PUBLIC_CHAT__ON_USER_CONNECTED, msg);
        });
}
