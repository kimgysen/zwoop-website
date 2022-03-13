import Tag from "@models/dto/domain-client-dto/tag/TagDto";

export const isWatchListEmpty = (tags: Tag[]) =>
    tags && tags.length === 0;


export const sortTags = (tags: Tag[]) =>
    [...tags]
        .sort((a, b) => a.tagName.localeCompare(b.tagName));
