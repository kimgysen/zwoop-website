import UserDto from "@models/dto/stomp/receive/common/user/UserDto";

export default interface AnswerDto {
    answerId: string,
    answerText: string,
    consultant: UserDto,
    createdAt: Date,
    updatedAt: Date
}

