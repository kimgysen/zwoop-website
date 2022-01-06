import AuthenticatedUser from "./AuthenticatedUser";
import Tag from "@models/Tag";

export default interface User extends AuthenticatedUser {
    aboutText?: string,
    profilePic: string,
    tags: Tag[],
    createdAt: Date
}
