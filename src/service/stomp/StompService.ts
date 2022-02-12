/**
 * Stompjs api documentation:
 * https://stomp-js.github.io/api-docs/latest/classes/Client.html
 */
import {Client, frameCallbackType} from '@stomp/stompjs';

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
    // client.debug = (str: string) => console.log(str);
    client.activate();
}

export const getStompClient = () => client;

export const isStompConnected = () => !!client;

export const disconnectStomp = async () => {
    if (client) {
        await client.deactivate()
    }
}
