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


export const getViewState =
    (authState: AuthState, post: Post, queryPartnerId: string): PostPageViewState => {
    if (post.postId && authState.isLoggedIn) {
        const isOwner = isPostOwner(authState, post);

        if (!authState.isLoggedIn) {
            return PostPageViewState.LOGGED_OFF;

        } else if (!isOwner) {
            return PostPageViewState.VISITOR_PRIVATE_CHAT;

        } else if (isOwner && !queryPartnerId) {
            return PostPageViewState.INBOX;

        } else if (isOwner && !!queryPartnerId) {
            return PostPageViewState.INBOX_DETAIL_CHAT;
        }
    }

    return PostPageViewState.LOGGED_OFF;
}