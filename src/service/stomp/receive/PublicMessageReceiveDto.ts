
export default interface PublicMessageReceiveDto {
    chatRoomId: string,
    date: Date,
    fromUserId: string,
    fromNickName: string,
    fromUserAvatar: string,
    message: string
}
