import Tag from "@models/tag/Tag";

export const isWatchListEmpty = (tags: Tag[]) =>
    tags && tags.length === 0;


export const sortTags = (tags: Tag[]) =>
    [...tags]
        .sort((a, b) => a.tagName.localeCompare(b.tagName));
