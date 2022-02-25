import UserDto from "@models/dto/stomp/receive/common/user/UserDto";

export default interface DealBoxDto {
    dealId: string;
    op: UserDto;
    consultant: UserDto;
}