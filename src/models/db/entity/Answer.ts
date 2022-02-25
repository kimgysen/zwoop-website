import User from "./User";


export default interface Answer {
    answerId: string,
    consultant: User,
    answerText: string,
    createdAt: Date,
    updatedAt: Date | undefined
}
