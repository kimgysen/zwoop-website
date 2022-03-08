import User from "./User";

export default interface Review {
    reviewId: string,
    op: User,
    consultant: User,
    reviewText: string,
    createdAt: Date,
    updatedAt: Date | undefined
}
