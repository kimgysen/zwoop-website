import InboxItemReceiveDto from "../service/stomp/receive/inbox/InboxItemReceiveDto";
import ChatPartner from "@models/chat/ChatPartner";

// Public api
export const rebuildInbox = (lastReceived: InboxItemReceiveDto, inboxItems: InboxItemReceiveDto[]): InboxItemReceiveDto[] => {
    let inbox;
    if (inboxIsEmpty(inboxItems)) {
        inbox = [lastReceived];

    } else {
        if (inboxItemExists(lastReceived, inboxItems)) {
            inbox = sortInboxItems([...replaceInboxItem(lastReceived, inboxItems)]);
        } else {
            inbox = [lastReceived, ...inboxItems];
        }
    }
    return inbox;
}

export const isInboxEmpty = (items: InboxItemReceiveDto[]): boolean =>
    items.length === 0;

export const isLastInboxItem = (items: InboxItemReceiveDto[], idx: number): boolean =>
    items.length - 1 === idx;

export const findItemByPartnerId = (inboxItems: InboxItemReceiveDto[], queryPartnerId: string) =>
    inboxItems.find(item => item.partnerId === queryPartnerId);

export const getPartnerFromInboxItem = (inboxItem: InboxItemReceiveDto): ChatPartner =>
    inboxItem.userId === inboxItem.fromUserId
        ? { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

export const hasUnreadMessages = (inboxItem: InboxItemReceiveDto) => inboxItem.unread > 0;

export const countUnreadMessages = (inboxItems: InboxItemReceiveDto[]) =>
    inboxItems.filter(item => item.unread > 0).length;

// Private api

export const sortInboxItems = (inboxItems: InboxItemReceiveDto[]) =>
    inboxItems.sort((a, b) => a.lastMessageDate < b.lastMessageDate ? 1 : -1);


const inboxIsEmpty = (inboxItems: InboxItemReceiveDto[]) =>
    inboxItems.length === 0;

const findInboxItemIdx = (lastReceived: InboxItemReceiveDto, inboxItems: InboxItemReceiveDto[]) =>
    inboxItems.findIndex(inboxItem => inboxItem.partnerId === lastReceived.fromUserId);

const inboxItemExists = (lastReceived: InboxItemReceiveDto, inboxItems: InboxItemReceiveDto[]) =>
    findInboxItemIdx(lastReceived, inboxItems) !== -1;

const replaceInboxItem = (lastReceived: InboxItemReceiveDto, inboxItems: InboxItemReceiveDto[]) => {
    const idx = findInboxItemIdx(lastReceived, inboxItems);
    if (idx !== -1) {
        inboxItems[idx] = lastReceived;
    }
    return inboxItems;
}
