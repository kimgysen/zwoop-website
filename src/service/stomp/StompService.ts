/**
 * Stompjs api documentation:
 * https://stomp-js.github.io/api-docs/latest/classes/Client.html
 */
import {Client, frameCallbackType} from '@stomp/stompjs';
import {messageCallbackType} from "@stomp/stompjs/src/types";
import PublicMessageSendDto from "./send/PublicMessageSendDto";
import PrivateMessageSendDto from "./send/PrivateMessageSendDto";

const uri = process.env.NEXT_PUBLIC_API_STOMP_BASE_URI;
const path = process.env.NEXT_PUBLIC_API_STOMP_WS_PATH;
const destinationPrefix = process.env.NEXT_PUBLIC_API_STOMP_WS_DESTINATION_PREFIX;

const connectUri = uri! + path!;

let client: Client;

// Public methods
export const connectStomp = (headerKeys: any,
                             jwt: string,
                             onConnectCallback: frameCallbackType,
                             onFailCallback: frameCallbackType,
                             onDisconnectCallback: frameCallbackType) => {
    client = new Client({
        brokerURL: connectUri,
        connectHeaders: {
            Authorization: `Bearer ${ jwt }`,
            ...headerKeys
        },
        onConnect: onConnectCallback,
        onStompError: onFailCallback,
        onDisconnect: onDisconnectCallback
    });
    client.activate();
}

export const disconnectStomp = async () => {
    if (client) {
        await client.deactivate()
    }
}

// Public chat
export const initPublicChat = (callback: messageCallbackType) => {
    client.subscribe(`/chatroom/old.public.messages`, callback);
}

export const subscribeToPublicChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.public.messages`, callback);
}

export const initConnectedUsers = (callback: messageCallbackType) => {
    client.subscribe(`/chatroom/connected.users`, callback);
}

export const subscribeToConnectedUsers = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.connected.users`, callback);
}

export const sendPublicMessage = (publicMessage: PublicMessageSendDto) => {
    client.publish({
        destination: "/chatroom/send.message.public",
        body: JSON.stringify(publicMessage)
    });
}

// Private chat
export const initInbox = (callback: messageCallbackType) => {
    client.subscribe(`/chatroom/inbox.items`, callback);
}

export const initPrivateChat = (chatRoomId: string, partnerId: string, callback: messageCallbackType) => {
    client.subscribe(`/chatroom/old.private.messages/${ partnerId }`, callback);
}

export const subscribeToPrivateChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/${ chatRoomId }.private.messages`, callback);
}

export const sendPrivateMessage = (privateMessage: PrivateMessageSendDto) => {
    client.publish({
        destination: '/chatroom/send.message.private',
        body: JSON.stringify(privateMessage)
    });
}

export const sendMarkInboxItemAsRead = (partnerId: string) => {
    client.publish({
        destination: '/chatroom/mark.as.read',
        body: JSON.stringify({ partnerId })
    })
}
