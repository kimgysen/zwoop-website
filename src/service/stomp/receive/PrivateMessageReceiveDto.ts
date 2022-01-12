
export default interface PrivateMessageReceiveDto {
    chatRoomId: string,
    userId: string,
    partnerId: string,
    date: Date,

    fromUserId: string,
    fromNickName: string,
    fromAvatar: string,

    toUserId: string,
    toNickName: string,
    toAvatar: string,

    message: string
}
