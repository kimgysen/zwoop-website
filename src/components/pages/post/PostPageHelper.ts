import Post from "@models/db/entity/Post";
import AuthState from "@models/auth/AuthState";
import {PostStatusEnum, stringFromPostStatusEnum} from "@models/db/entity/PostStatus";
import {isOp, isPostDealConsultant} from "../../../util/PostUtil";
import {isDealConsultant} from "../../../util/DealUtil";
import Deal from "@models/db/entity/Deal";

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

export const getPostStatusFromPost = (post?: Post): PostStatusEnum =>
    post
        ? post?.postState?.postStatus?.status as unknown as PostStatusEnum
        : PostStatusEnum.POST_SETUP;

export const isStatusPostInit = (post: Post) =>
    post?.postState?.postStatus?.status === stringFromPostStatusEnum(PostStatusEnum.POST_INIT);

export const isStatusDealInit = (post: Post) =>
    post?.postState?.postStatus?.status === stringFromPostStatusEnum(PostStatusEnum.DEAL_INIT);

export const isChatAllowed = (authState: AuthState, post: Post) => {
    return isStatusPostInit(post)
        || (isStatusDealInit(post)
            && (isOp(authState, post) || isPostDealConsultant(authState, post)));
}

export const isAnswerAllowed = (authState: AuthState, postStatus: PostStatusEnum, deal?: Deal|null) => {
    return postStatus === PostStatusEnum.DEAL_INIT
        && isDealConsultant(authState, deal);
};

