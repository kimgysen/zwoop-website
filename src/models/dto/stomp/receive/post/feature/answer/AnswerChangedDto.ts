import UserDto from "@models/dto/stomp/receive/common/user/UserDto";


export default interface AnswerChangedDto {
    answerId: string;
    answerText: string,
    op: UserDto,
    consultant: UserDto
}