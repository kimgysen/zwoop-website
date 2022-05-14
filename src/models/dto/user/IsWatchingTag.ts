import TagDto from "@models/dto/domain-client-dto/tag/TagDto";

export interface IsWatchingTag {
    isWatching: boolean,
    tag: TagDto
}
