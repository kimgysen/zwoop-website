import UserDto from "@models/dto/stomp/receive/common/user/UserDto";


export default interface BiddingUpdateDto {
    biddingId: string,
    consultant: UserDto
}
