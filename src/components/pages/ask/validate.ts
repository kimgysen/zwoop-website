import Tag from "@models/tag/Tag";


export const TITLE_MIN_CHARS = 10;
export const TITLE_MAX_CHARS = 200;
export const DESCRIPTION_MIN_CHARS = 10;
export const DESCRIPTION_MAX_CHARS = 30000;
export const TAGS_MIN = 1;
export const TAGS_MAX = 3;
export const BID_MIN = 0.01;


export const validateTitle = (title: string): boolean => {
    return title.length >= TITLE_MIN_CHARS
        && title.length <= TITLE_MAX_CHARS;
}

export const validateDescriptionMd = (descriptionMd: string): boolean => {
    return descriptionMd.length > DESCRIPTION_MIN_CHARS
        && descriptionMd.length <= DESCRIPTION_MAX_CHARS;
}

export const validateTags = (tags: Tag[]): boolean => {
    return tags.length >= TAGS_MIN
        && tags.length <= TAGS_MAX;
}

export const validateBidPrice = (bidPrice: number): boolean =>
    !!bidPrice && bidPrice >= BID_MIN;

export const validateForm = (title: string, descriptionMd: string, tags: Tag[], bidPrice: number): boolean => {
    return validateTitle(title)
        && validateDescriptionMd(descriptionMd)
        && validateTags(tags)
        && validateBidPrice(bidPrice);
}