import Post from "@models/post/Post";

export const isEmptyFeed = (feedList: Post[]) =>
    feedList.length === 0;
