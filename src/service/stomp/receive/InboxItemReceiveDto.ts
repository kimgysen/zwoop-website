import PrivateMessageReceiveDto from "./PrivateMessageReceiveDto";

export default interface InboxItemReceiveDto {
    postId: string,
    userId: string,
    partnerId: string,

    fromUserId: string,
    fromNickName: string,
    fromAvatar: string,

    toUserId: string,
    toNickName: string,
    toAvatar: string,

    unread: number,
    hasPartnerRead: boolean,
    lastMessageDate: Date,
    lastMessage: string

}


export const mapFromNewPrivateMessage = (inboxItem: InboxItemReceiveDto | null, dto: PrivateMessageReceiveDto) =>
    ({
        ...dto,
        userId: dto.toUserId,
        partnerId: dto.fromUserId,
        unread: inboxItem ? ++inboxItem.unread : 1,
        hasPartnerRead: true,
        lastMessageDate: dto.date,
        lastMessage: dto.message
    });
