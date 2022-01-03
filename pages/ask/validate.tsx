import Tag from "@models/Tag";


export const TITLE_MIN_CHARS = 10;
export const TITLE_MAX_CHARS = 100;
export const DESCRIPTION_MIN_CHARS = 10;
export const DESCRIPTION_MAX_CHARS = 30000;
export const TAGS_MIN = 1;
export const TAGS_MAX = 3;
export const OFFER_MIN = 0.003;


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

export const validateOffer = (offer: number): boolean => {
    return !!offer && offer >= OFFER_MIN;
}

export const validateForm = (title: string, descriptionMd: string, tags: Tag[], offer: number): boolean => {
    return validateTitle(title)
        && validateDescriptionMd(descriptionMd)
        && validateTags(tags)
        && validateOffer(offer);
}