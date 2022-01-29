/**
 * Stompjs api documentation:
 * https://stomp-js.github.io/api-docs/latest/classes/Client.html
 */
import {Client, frameCallbackType} from '@stomp/stompjs';
import {messageCallbackType} from "@stomp/stompjs/src/types";
import PublicMessageSendDto from "./send/PublicMessageSendDto";
import PrivateMessageSendDto from "./send/PrivateMessageSendDto";
import InboxItemReceiveDto from "./receive/InboxItemReceiveDto";

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

export const isStompConnected = () => !!client;

export const disconnectStomp = async () => {
    if (client) {
        await client.deactivate()
    }
}

// Public chat
export const initPublicChat = (callback: messageCallbackType) => {
    client.subscribe(`/app/chatroom.old.messages`, callback);
}

export const subscribeToPublicChat = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.chatroom.messages`, callback);
}

export const initConnectedUsers = (callback: messageCallbackType) => {
    client.subscribe(`/app/chatroom.connected.users`, callback);
}

export const subscribeToConnectedUsers = (chatRoomId: string, callback: messageCallbackType) => {
    client.subscribe(`/topic/${ chatRoomId }.connected.users`, callback);
}

export const sendPublicMessage = (publicMessage: PublicMessageSendDto) => {
    client.publish({
        destination: "/app/send.message.chatroom",
        body: JSON.stringify(publicMessage)
    });
}

// Subscriptions
export const initAppInbox = (callback: messageCallbackType) => {
    client.subscribe(`/app/app.inbox.items`, callback);
}

export const initPostInbox = (postId: string, callback: messageCallbackType) => {
    client.subscribe(`/app/post/${postId}/inbox.items`, callback);
}

export const initPrivateChat = (partnerId: string, callback: messageCallbackType) => {
    client.subscribe(`/app/old.private.messages/${ partnerId }`, callback);
}

export const initPartnerRead = (partnerId: string, callback: messageCallbackType) => {
    client.subscribe(`/app/old.private.messages/${ partnerId }/read`, callback);
}

export const initPartnerIsWriting = (partnerId: string, callback: messageCallbackType) => {
    client.subscribe(`/app/writing/partner/${partnerId}`, callback);
}

export const subscribeToStartTyping = (callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/start.typing`, callback);
}

export const subscribeToStopTyping = (callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/stop.typing`, callback);
}

export const subscribeToPrivateChat = (callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/private.messages`, callback);
}

export const subscribeToPartnerRead = (callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/partner.read`, callback);
}

export const subscribeToInboxUpdates = (callback: messageCallbackType) => {
    client.subscribe(`/user/exchange/amq.direct/inbox.item.received`, callback);
}

// Send
export const sendPrivateMessage = (privateMessage: PrivateMessageSendDto) => {
    client.publish({
        destination: '/app/send.message.private',
        body: JSON.stringify(privateMessage)
    });
}

const validatePartnerId = (partnerId: string, methodName: string) => {
    if (!partnerId) {
        throw Error(`${methodName}: partnerId is null`);
    }
    return true;
}

export const sendMarkInboxItemAsRead = (partnerId: string) => {
    validatePartnerId(partnerId, 'sendMarkInboxItemAsRead');
    client.publish({
        destination: '/app/mark.as.read',
        body: JSON.stringify({ partnerId })
    });
}

export const sendStartTyping = (partnerId: string) => {
    validatePartnerId(partnerId, 'sendStartTyping');
    if (partnerId) {
        client.publish({
            destination: `/app/start.typing/${ partnerId }`
        });
    } else {
        console.error('sendStartTyping: partnerId is null');
    }
}

export const sendStopTyping = (partnerId: string) => {
    validatePartnerId(partnerId, 'sendStopTyping');
    client.publish({
        destination: `/app/stop.typing/${ partnerId }`
    });
}
