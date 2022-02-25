import Post from "@models/db/entity/Post";
import PostStatus from "@models/db/entity/PostStatus";
import Deal from "@models/db/entity/Deal";
import Answer from "@models/db/entity/Answer";
import Review from "@models/db/entity/Review";


export default interface PostState {
    postStateId: string,
    post: Post,
    postStatus: PostStatus,
    deal?: Deal | null,
    answer?: Answer | null,
    review?: Review | null
}
