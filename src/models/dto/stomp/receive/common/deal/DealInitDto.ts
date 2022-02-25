import UserDto from "@models/dto/stomp/receive/notification/feature/user/UserDto";

export default interface DealInitDto {
    dealId: string;
    postId: string;
    postTitle: string;
    op: UserDto;
    consultant: UserDto;
    dealPrice: string;
    currencyCode: string;
}
