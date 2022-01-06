/**
 * Stompjs api documentation:
 * https://stomp-js.github.io/api-docs/latest/classes/Client.html
 */
import {Client, frameCallbackType} from '@stomp/stompjs';
import {messageCallbackType} from "@stomp/stompjs/src/types";

const uri = process.env.NEXT_PUBLIC_API_STOMP_BASE_URI;
const path = process.env.NEXT_PUBLIC_API_STOMP_WS_PATH;
const destinationPrefix = process.env.NEXT_PUBLIC_API_STOMP_WS_DESTINATION_PREFIX;

const connectUri = uri! + path!;

let client: Client;

// Public methods
export const connectStomp = (chatRoomId: string,
                             jwt: string,
                             onConnectCallback: frameCallbackType,
                             onFailCallback: frameCallbackType,
                             onDisconnectCallback: frameCallbackType) => {
    client = new Client({
        brokerURL: connectUri,
        connectHeaders: {
            chatRoomId,
            Authorization: `Bearer ${ jwt }`
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

export const initPublicChat = (callback: messageCallbackType) => {
    client.subscribe(`/chatroom/old.public.messages`, callback);
}

export const subscribeToPublicChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.public.messages`, callback);
}

export const subscribeToPrivateChat = (callback: messageCallbackType) => {
    client.subscribe(`/user/queue/private.messages`, callback, {
        'auto-delete': 'true',
        durable: 'false'
    });
}

export const initConnectedUsers = (callback: messageCallbackType) => {
    client.subscribe(`/chatroom/connected.users`, callback);
}

export const subscribeToConnectedUsers = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.connected.users`, callback);
}

export const sendPublicMessage = (chatRoomId: string, message: string) => {
    const pubMessage = { chatRoomId, message }
    client.publish({
        destination: "/chatroom/send.message.public",
        body: JSON.stringify(pubMessage)
    });
}
