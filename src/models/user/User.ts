import AuthenticatedUser from "./AuthenticatedUser";
import Tag from "@models/tag/Tag";

export default interface User extends AuthenticatedUser {
    aboutText?: string,
    profilePic: string,
    tags: Tag[],
    createdAt: Date,
    updatedAt: Date
}
