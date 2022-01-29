import InboxItemReceiveDto from "../service/stomp/receive/InboxItemReceiveDto";

// Public api
export const rebuildInbox = (lastReceived: InboxItemReceiveDto, inboxItems: InboxItemReceiveDto[]) => {
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

export const isInboxEmpty = (items: InboxItemReceiveDto[]) =>
    items.length === 0;

export const isLastInboxItem = (items: InboxItemReceiveDto[], idx: number) =>
    items.length - 1 === idx;


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
