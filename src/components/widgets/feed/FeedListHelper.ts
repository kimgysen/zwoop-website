import Post from "@models/db/entity/Post";

export const isEmptyFeed = (feedList: Post[]) =>
    feedList.length === 0;
