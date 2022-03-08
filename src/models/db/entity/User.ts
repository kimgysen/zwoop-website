import AuthenticatedUser from "../../auth/AuthenticatedUser";
import Tag from "@models/db/entity/Tag";

export default interface User extends AuthenticatedUser {
    aboutText?: string,
    profilePic: string,
    tags: Tag[],
    createdAt: Date,
    updatedAt: Date
}
