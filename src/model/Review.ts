import User from "./User";

export default interface Review {
    reviewId: string,
    reviewer: User,
    reviewee: User,
    reviewText: string,
    createdAt: Date,
    updatedAt: Date | undefined
}
