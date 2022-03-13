import Tag from "@models/dto/domain-client-dto/tag/TagDto";

export default interface SavePostDto {
    title: string,
    text: string,
    bidPrice: string,
    currencyCode: string,
    tags: Tag[]
}
