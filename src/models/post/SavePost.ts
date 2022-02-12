import Tag from "@models/tag/Tag";

export default interface SavePost {
    title: string,
    text: string,
    bidPrice: string,
    currencyCode: string,
    tags: Tag[]
}
