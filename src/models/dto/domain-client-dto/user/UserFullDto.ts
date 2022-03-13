import TagDto from "@models/dto/domain-client-dto/tag/TagDto";

export default interface UserFullDto {
    userId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    avatar: string;
    email: string;
    aboutText: string;
    tags: TagDto[];
    createdAt: Date;
    updatedAt: Date

}
