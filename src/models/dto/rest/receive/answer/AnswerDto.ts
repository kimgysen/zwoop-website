import UserDto from "@models/dto/stomp/receive/common/user/UserDto";

export default interface AnswerDto{
    answerId: string;
    op: UserDto;
    consultant: UserDto;
    answerText: string;
    createdAt: Date;
    updatedAt: Date;
}
