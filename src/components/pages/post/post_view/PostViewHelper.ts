import Post from "@models/post/Post";
import AuthState from "@models/user/AuthState";


export enum PostPageViewState {
    LOGGED_OFF,
    VISITOR_PRIVATE_CHAT,
    INBOX,
    INBOX_DETAIL_CHAT
}


export const isPostOwner = (authState: AuthState, post: Post) =>
    authState.isLoggedIn &&
    authState.principalId === post.asker.userId;


