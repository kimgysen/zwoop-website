import PrivateMessageReceiveDto from "@models/dto/stomp/receive/private_chat/feature/PrivateMessageReceiveDto";
import {NextRouter} from "next/router";
import ChatPartner from "@models/chat/ChatPartner";
import PartnerReadDto from "@models/dto/stomp/receive/private_chat/feature/PartnerReadDto";
import InboxItemDto from "@models/dto/stomp/receive/user-notification/feature/inbox/InboxItemDto";
import {sendPrivateMessage} from "../../../../../service/stomp/publishers/PrivateChatPublisher";


export const redirectToLogin = (router: NextRouter) => {
    router.push('/login');
}

export const isEmptyList = (messages: PrivateMessageReceiveDto[]) =>
    messages.length === 0;

export const resetCounterForPartner = (inboxItems: InboxItemDto[], partnerId: string) => {
    const idx = findInboxItemIndexByPartnerId(inboxItems, partnerId);
    if (inboxItems[idx]) {
        inboxItems[idx].unread = 0;
    }
    return inboxItems;
}

export const lastMessageWasSentByPrincipal = (messages: PrivateMessageReceiveDto[], principalId: string) => {
    return lastMessageSentBy(messages) === principalId;
}

const findInboxItemIndexByPartnerId = (inboxItems: InboxItemDto[], partnerId: string) =>
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
