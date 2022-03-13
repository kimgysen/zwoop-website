import PostDto from "@models/dto/domain-client-dto/post/PostDto";

export const isEmptyFeed = (feedList: PostDto[]) =>
    feedList.length === 0;
