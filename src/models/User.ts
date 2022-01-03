import AuthenticatedUser from "./AuthenticatedUser";

export default interface User extends AuthenticatedUser {
    about?: string | null,
    profilePic: string,
    tags: string[],
    createdAt: Date
}
