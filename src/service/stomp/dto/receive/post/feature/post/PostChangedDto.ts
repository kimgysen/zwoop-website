import Tag from "@models/tag/Tag";

export default interface PostChangedDto {
    nickName: string;
    postTitle: string;
    postText: string;
    bidPrice: string;
    tags: Tag[];
}
