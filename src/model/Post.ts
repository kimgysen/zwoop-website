import User from "./User";
import Tag from "./Tag";
import PostStatus from "./PostStatus";

export enum PostStatusEnum {
    OPEN,
    IN_PROCESS
}

export default interface Post {
    postId: string,
    asker: User,
    postTitle: string,
    postText: string,
    bidPrice: number,
    postStatus: PostStatus,
    tags: Tag[]
    createdAt: Date,
    updatedAt: Date | undefined
}
