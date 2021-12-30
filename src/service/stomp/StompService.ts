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

export const subscribeToPublicChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.public.messages`, callback);
}

export const subscribeToPrivateChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/user/queue/${ chatRoomId }.private.messages`, callback, {
        'auto-delete': 'true',
        durable: 'false'
    });
}
