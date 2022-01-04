import User from "./User";
import Tag from "./Tag";
import PostStatus from "./PostStatus";
import Answer from "@models/Answer";
import Application from "@models/Application";

export enum PostStatusEnum {
    OPEN,
    IN_PROCESS
}

export default interface Post {
    postId: string,
    answers: Answer[],
    applications: Application[],
    asker: User,
    currency: string,
    offerPrice: string,
    postStatus: PostStatus,
    postTitle: string,
    postText: string,
    tags: Tag[],
    createdAt: Date,
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
}
