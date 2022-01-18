import AuthState from "@models/user/AuthState";
import Post from "@models/Post";
import PrivateMessageReceiveDto from "../../../../service/stomp/receive/PrivateMessageReceiveDto";
import {getRawJwt} from "../../../../service/jwt/JwtService";
import {connectPrivateChat} from "../../../../service/stomp/PrivateChatStompService";
import {NextRouter} from "next/router";
import {sendPrivateMessage} from "../../../../service/stomp/StompService";
import ChatPartner from "@models/chat/ChatPartner";
import {getPrivateMessageDispatcher} from "../../../../event_dispatchers/private_messages/PrivateMessageDispatcher";
import {getInitPrivateMessagesDispatcher} from "../../../../event_dispatchers/private_messages/InitPrivateMessagesDispatcher";
import {getPartnerReadDispatcher} from "../../../../event_dispatchers/private_messages/PartnerReadDispatcher";
import PartnerReadDto from "../../../../service/stomp/receive/PartnerReadDto";
import {getInitPartnerReadDispatcher} from "../../../../event_dispatchers/private_messages/InitPartnerReadDispatcher";
import {getStartTypingDispatcher} from "../../../../event_dispatchers/private_messages/StartTypingDispatcher";
import {getStopTypingDispatcher} from "../../../../event_dispatchers/private_messages/StopTypingDispatcher";
import TypingDto from "../../../../service/stomp/receive/TypingDto";


export const isPostOwner = (authState: AuthState, post: Post) =>
    authState.isLoggedIn &&
    authState.principalId === post.asker.userId;

export const redirectToLogin = (router: NextRouter) => {
    router.push('/login');
}

export const lastMessageSentBy = (messages: PrivateMessageReceiveDto[]) => {
    return messages && messages.length
        ? messages[0].fromUserId
        : null;
}

interface ConnectPrivateChatProps {
    postId: string,
    partnerId: string,
    router: NextRouter
}

export const connectToPrivateChat = async (
    { postId, partnerId, router }: ConnectPrivateChatProps) => {
    const jwt = await getRawJwt();
    const SESS_POST_ID = `post-${ postId }`;

    connectPrivateChat({
        jwt,
        postId: SESS_POST_ID,
        partnerId,
        redirectToLogin: () => redirectToLogin(router)
    });
}

export const handleSendPrivateMessage = (postId: string, partner: ChatPartner, message: string) => {
    const SESS_POST_ID = `post-${ postId }`;
    sendPrivateMessage({
        postId: SESS_POST_ID,
        message,
        toUserId:  partner.partnerId,
        toUserNickName: partner.partnerNickName,
        toUserAvatar: partner.partnerAvatar
    });
}

const privateMessageDispatcher = getPrivateMessageDispatcher();

export const addInitPrivateMessagesListener = (cb: (messages: PrivateMessageReceiveDto[]) => void) => {
    const initPrivateMessagesListener = (ev: CustomEvent<PrivateMessageReceiveDto[]>) => {
        cb(ev.detail);
    }
    initPrivateMessagesDispatcher.addListener(initPrivateMessagesListener);
    return initPrivateMessagesListener;
};

const initPrivateMessagesDispatcher = getInitPrivateMessagesDispatcher();

export const addPrivateMessageListener = (cb: (message: PrivateMessageReceiveDto) => void) => {
    const privateMessageListener = (ev: CustomEvent<PrivateMessageReceiveDto>) => {
        cb(ev.detail);
    }
    privateMessageDispatcher.addListener(privateMessageListener);
    return privateMessageListener;
}

const initPartnerReadDispatcher = getInitPartnerReadDispatcher();

export const addInitPartnerReadListener = (cb: (message: boolean) => void) => {
    const initPartnerReadListener = (ev: CustomEvent<boolean>) => {
        cb(ev.detail);
    }
    initPartnerReadDispatcher.addListener(initPartnerReadListener);
    return initPartnerReadListener;
}

const partnerReadDispatcher = getPartnerReadDispatcher();

export const addPartnerReadListener = (cb: (message: PartnerReadDto) => void) => {
    const partnerReadListener = (ev: CustomEvent<PartnerReadDto>) => {
        cb(ev.detail);
    }
    partnerReadDispatcher.addListener(partnerReadListener);
    return partnerReadListener;
}

const startTypingDispatcher = getStartTypingDispatcher();

export const addStartTypingListener = (cb: (message: TypingDto) => void) => {
    const startTypingListener = (ev: CustomEvent<TypingDto>) => {
        cb(ev.detail);
    }
    startTypingDispatcher.addListener(startTypingListener);
    return startTypingListener;
}

const stopTypingDispatcher = getStopTypingDispatcher();

export const addStopTypingListener = (cb: (message: TypingDto) => void) => {
    const stopTypingListener = (ev: CustomEvent<TypingDto>) => {
        cb(ev.detail);
    }
    stopTypingDispatcher.addListener(stopTypingListener);
    return stopTypingListener;
}
