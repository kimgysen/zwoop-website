import PrivateMessageReceiveDto from "../../../../../service/stomp/receive/private_chat/PrivateMessageReceiveDto";
import {NextRouter} from "next/router";
import {sendPrivateMessage} from "../../../../../service/stomp/StompService";
import ChatPartner from "@models/chat/ChatPartner";
import PartnerReadDto from "../../../../../service/stomp/receive/private_chat/PartnerReadDto";
import InboxItemReceiveDto from "../../../../../service/stomp/receive/inbox/InboxItemReceiveDto";


export const redirectToLogin = (router: NextRouter) => {
    router.push('/login');
}

export const isEmptyList = (messages: PrivateMessageReceiveDto[]) =>
    messages.length === 0;

export const resetCounterForPartner = (inboxItems: InboxItemReceiveDto[], partnerId: string) => {
    const idx = findInboxItemIndexByPartnerId(inboxItems, partnerId);
    if (inboxItems[idx]) {
        inboxItems[idx].unread = 0;
    }
    return inboxItems;
}

export const lastMessageWasSentByPrincipal = (messages: PrivateMessageReceiveDto[], principalId: string) => {
    return lastMessageSentBy(messages) === principalId;
}

const findInboxItemIndexByPartnerId = (inboxItems: InboxItemReceiveDto[], partnerId: string) =>
    inboxItems.findIndex(item => item.partnerId === partnerId);


const lastMessageSentBy = (messages: PrivateMessageReceiveDto[]) => {
    return messages && messages.length
        ? messages[0].fromUserId
        : null;
}

export const hasPartnerRead = (hasPartnerReadDto: PartnerReadDto|null, postId: string, partner?: ChatPartner) => {
    return hasPartnerReadDto
        && hasPartnerReadDto?.postId === postId
        && hasPartnerReadDto?.partnerId === partner?.partnerId
}

export const handleSendPrivateMessage = (postId: string, partner: ChatPartner, message: string) => {
    sendPrivateMessage({
        postId,
        message,
        toUserId:  partner.partnerId,
        toUserNickName: partner.partnerNickName,
        toUserAvatar: partner.partnerAvatar
    });
}
