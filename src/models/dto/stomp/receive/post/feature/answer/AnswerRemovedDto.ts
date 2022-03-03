import UserDto from "@models/dto/stomp/receive/common/user/UserDto";


export default interface AnswerRemovedDto {
    answerId: string;
    op: UserDto,
    consultant: UserDto;
}
