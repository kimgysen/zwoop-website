import UserDto from "@models/dto/stomp/receive/common/user/UserDto";

export default interface BiddingDto {
    biddingId: string;
    op: UserDto;
    consultant: UserDto;
    askPrice: string;
    currencyCode: string;
    createdAt: Date;
    updatedAt: Date;
}
