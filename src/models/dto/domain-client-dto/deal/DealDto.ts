import UserDto from "@models/dto/domain-client-dto/user/UserDto";


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
