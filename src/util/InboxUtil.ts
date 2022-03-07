import InboxItemDto from "@models/dto/stomp/receive/user-notification/feature/inbox/InboxItemDto";
import ChatPartner from "@models/chat/ChatPartner";

// Public api
export const rebuildInbox = (lastReceived: InboxItemDto, inboxItems: InboxItemDto[]): InboxItemDto[] => {
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

export const isInboxEmpty = (items: InboxItemDto[]): boolean =>
    !items || items.length === 0;

export const isLastInboxItem = (items: InboxItemDto[], idx: number): boolean =>
    items.length - 1 === idx;

export const findItemByPartnerId = (inboxItems: InboxItemDto[], queryPartnerId: string) =>
    inboxItems.find(item => item.partnerId === queryPartnerId);

export const getPartnerFromInboxItem = (inboxItem: InboxItemDto): ChatPartner =>
    inboxItem.userId === inboxItem.fromUserId
        ? { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.toNickName,
            partnerAvatar: inboxItem.toAvatar }
        : { partnerId: inboxItem.partnerId,
            partnerNickName: inboxItem.fromNickName,
            partnerAvatar: inboxItem.fromAvatar };

export const hasUnreadMessages = (inboxItem: InboxItemDto) => inboxItem.unread > 0;

export const countUnreadMessages = (principalId: string, inboxItems: InboxItemDto[]) =>
    inboxItems && inboxItems.length > 0 ?
        inboxItems.filter(item =>
            item.fromUserId !== principalId
            && item.unread > 0
        ).length
        : 0;

export const sortInboxItems = (inboxItems: InboxItemDto[]) =>
    inboxItems.sort((a, b) => a.lastMessageDate < b.lastMessageDate ? 1 : -1);


const inboxIsEmpty = (inboxItems: InboxItemDto[]) =>
    inboxItems.length === 0;

const findInboxItemIdx = (lastReceived: InboxItemDto, inboxItems: InboxItemDto[]) =>
    inboxItems.findIndex(inboxItem => inboxItem.partnerId === lastReceived.partnerId);

const inboxItemExists = (lastReceived: InboxItemDto, inboxItems: InboxItemDto[]) =>
    findInboxItemIdx(lastReceived, inboxItems) !== -1;

const replaceInboxItem = (lastReceived: InboxItemDto, inboxItems: InboxItemDto[]) => {
    const idx = findInboxItemIdx(lastReceived, inboxItems);
    if (idx !== -1) {
        inboxItems[idx] = lastReceived;
    }
    return inboxItems;
}
