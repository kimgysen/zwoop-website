import UserDto from "@models/dto/stomp/receive/notification/feature/user/UserDto";

export default interface DealCancelledDto {
    dealId: string;
    op: UserDto;
    consultant: UserDto;
}
