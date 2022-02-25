import UserDto from "@models/dto/stomp/receive/notification/feature/user/UserDto";


export default interface BiddingUpdateDto {
    biddingId: string,
    consultant: UserDto
}
