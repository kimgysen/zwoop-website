import AuthenticatedUser from "./AuthenticatedUser";

export default interface User extends AuthenticatedUser {
    about?: string | null,
    tags: string[],
    createdAt: Date
}
