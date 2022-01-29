import PrivateMessageReceiveDto from "../../../../../service/stomp/receive/PrivateMessageReceiveDto";
import {NextRouter} from "next/router";
import {sendPrivateMessage} from "../../../../../service/stomp/StompService";
import ChatPartner from "@models/chat/ChatPartner";
import PartnerReadDto from "../../../../../service/stomp/receive/PartnerReadDto";


export const redirectToLogin = (router: NextRouter) => {
    router.push('/login');
}

export const isEmptyList = (messages: PrivateMessageReceiveDto[]) =>
    messages.length === 0;

export const lastMessageWasSentByPrincipal = (messages: PrivateMessageReceiveDto[], principalId: string) => {
    return lastMessageSentBy(messages) === principalId;
}

const lastMessageSentBy = (messages: PrivateMessageReceiveDto[]) => {
    return messages && messages.length
        ? messages[0].fromUserId
        : null;
}

export const hasPartnerRead = (hasPartnerReadDto: PartnerReadDto|null, postId: string, partner?: ChatPartner) => {
    return hasPartnerReadDto
        && hasPartnerReadDto?.postId === `post-${postId}`
        && hasPartnerReadDto?.partnerId === partner?.partnerId
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
