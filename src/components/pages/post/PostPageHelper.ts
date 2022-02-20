import Post, {PostStatusEnum, stringFromPostStatusEnum} from "@models/post/Post";
import AuthState from "@models/user/AuthState";
import {
    DealStatusEnum,
    dealStatusEnumFromString
} from "../../../service/stomp/dto/receive/notification/feature/deal/Deal";

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

export const getPostStatusFromPost = (post: Post): PostStatusEnum =>
    post?.postStatus.postStatus as unknown as PostStatusEnum;

export const postStatusIsOpen = (post: Post) =>
    post?.postStatus?.postStatus === stringFromPostStatusEnum(PostStatusEnum.OPEN);

export const postStatusIsInProgress = (post: Post) =>
    post?.postStatus?.postStatus === stringFromPostStatusEnum(PostStatusEnum.IN_PROGRESS);

export const isChatAllowed = (authState: AuthState, post: Post) => {
    const deal = post.deal;
    const principalId = authState?.principalId;

    if (!deal
        || dealStatusEnumFromString(deal?.dealStatus.dealStatus as string) === DealStatusEnum.CANCELLED) {
        return true;

    } else if (dealStatusEnumFromString(deal?.dealStatus.dealStatus as string) === DealStatusEnum.OPEN
        && (
            deal.asker.userId === principalId
            || deal.respondent.userId === principalId)) {
        return true;
    }

    return false;
}
