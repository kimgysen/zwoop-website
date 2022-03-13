import UserDto from "@models/dto/domain-client-dto/user/UserDto";
import TagDto from "@models/dto/domain-client-dto/tag/TagDto";
import PostStateDto from "@models/dto/domain-client-dto/post/PostStateDto";

export default interface PostDto {
    postId: string;
    op: UserDto;
    postTitle: string;
    postText: string;
    bidPrice: string;
    currencyCode: string;
    tagList: TagDto[];
    postState: PostStateDto;
    createdAt: Date;
    updatedAt: Date;
}