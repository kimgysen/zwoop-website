import Tag from "@models/db/entity/Tag";

export default interface CreatePostDto {
    title: string,
    text: string,
    bidPrice: string,
    currencyCode: string,
    tags: Tag[]
}
