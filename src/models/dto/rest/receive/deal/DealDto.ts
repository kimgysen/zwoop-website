import UserDto from "@models/dto/stomp/receive/common/user/UserDto";


export default interface DealDto {
    dealId: string;
    op: UserDto;
    consultant: UserDto;
    postId: string;
    postTitle: string;
    dealPrice: string;
    currencyCode: string;
    createdAt: Date;
}
