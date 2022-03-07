import UserDto from "@models/dto/stomp/receive/common/user/UserDto";
import TagDto from "@models/dto/stomp/receive/common/tag/TagDto";
import PostStateDto from "@models/dto/rest/receive/post/PostStateDto";

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