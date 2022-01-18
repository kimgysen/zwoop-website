import User from "./user/User";
import AnswerStatus from "./AnswerStatus";

export enum AnswerStatusEnum {
    PENDING,
    ACECEPTED
}

export default interface Answer {
    answerId: string,
    respondent: User,
    answerText: string,
    answerStatus: AnswerStatus,
    createdAt: Date,
    updatedAt: Date | undefined
}