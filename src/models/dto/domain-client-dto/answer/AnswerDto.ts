import UserDto from "@models/dto/domain-client-dto/user/UserDto";

export default interface AnswerDto{
    answerId: string;
    op: UserDto;
    consultant: UserDto;
    answerText: string;
    createdAt: Date;
    updatedAt: Date;
}
