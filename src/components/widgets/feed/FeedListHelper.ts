import PostDto from "@models/dto/rest/receive/post/PostDto";

export const isEmptyFeed = (feedList: PostDto[]) =>
    feedList.length === 0;
