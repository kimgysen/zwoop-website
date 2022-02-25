import Tag from "@models/db/entity/Tag";

export default interface PostChangedDto {
    nickName: string;
    postTitle: string;
    postText: string;
    bidPrice: string;
    tags: Tag[];
}
