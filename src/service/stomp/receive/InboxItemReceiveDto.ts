
export default interface InboxItemReceiveDto {
    chatRoomId: string,
    userId: string,
    partnerId: string,

    fromUserId: string,
    fromNickName: string,
    fromAvatar: string,

    toUserId: string,
    toNickName: string,
    toAvatar: string,

    unread: number,
    lastMessageDate: Date,
    lastMessage: string

}