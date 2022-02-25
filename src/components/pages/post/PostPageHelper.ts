import Post from "@models/db/entity/Post";
import AuthState from "@models/auth/AuthState";
import {PostStatusEnum, stringFromPostStatusEnum} from "@models/db/entity/PostStatus";
import {isDealConsultant, isOp} from "../../../util/PostUtil";

export enum PostPageViewState {
    LOGGED_OFF,
    VISITOR_PRIVATE_CHAT,
    INBOX,
    INBOX_DETAIL_CHAT
}

export const getViewState =
    (authState: AuthState, post: Post, queryPartnerId: string): PostPageViewState => {
    if (post?.postId && authState.isLoggedIn) {
        const isOwner = isOp(authState, post);

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

export const getPostStatusFromPost = (post: Post): PostStatusEnum =>
    post?.postState?.postStatus?.status as unknown as PostStatusEnum;

export const isStatusPostInit = (post: Post) =>
    post?.postState?.postStatus?.status === stringFromPostStatusEnum(PostStatusEnum.POST_INIT);

export const isStatusDealInit = (post: Post) =>
    post?.postState?.postStatus?.status === stringFromPostStatusEnum(PostStatusEnum.DEAL_INIT);

export const isChatAllowed = (authState: AuthState, post: Post) => {
    return isStatusPostInit(post)
        || (isStatusDealInit(post)
            && (isOp(authState, post) || isDealConsultant(authState, post)));
}

export const isAnswerAllowed = (authState: AuthState, post: Post) => {
    return isStatusDealInit(post)
        && isDealConsultant(authState, post);
};

