
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
