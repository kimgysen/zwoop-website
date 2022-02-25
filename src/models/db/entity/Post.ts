import User from "./User";
import Tag from "./Tag";
import Currency from "@models/db/entity/Currency";
import PostState from "@models/db/entity/PostState";


export default interface Post {
    postId: string,
    op: User,
    postTitle: string,
    postText: string,
    bidPrice: string,
    currency: Currency,
    tags: Tag[],
    postState: PostState,
    createdAt: Date,
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
}
