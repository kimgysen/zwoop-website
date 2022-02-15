import User from "../user/User";
import Tag from "../tag/Tag";
import PostStatus from "./PostStatus";
import Currency from "@models/post/Currency";

export enum PostStatusEnum {
    OPEN = "OPEN",
    IN_PROGRESS= "IN_PROGRESS"
}

export const stringFromPostStatusEnum = (postStatusEnum: PostStatusEnum): string =>
    PostStatusEnum[postStatusEnum];

export default interface Post {
    postId: string,
    asker: User,
    currency: Currency,
    bidPrice: string,
    postStatus: PostStatus,
    postTitle: string,
    postText: string,
    tags: Tag[],
    createdAt: Date,
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
}
