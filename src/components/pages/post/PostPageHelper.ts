import AuthState from "@models/auth/AuthState";
import {PostStatusEnum, stringFromPostStatusEnum} from "@models/db/entity/PostStatus";
import {isOp, isPostDealConsultant} from "../../../util/PostUtil";
import {isDealConsultant} from "../../../util/DealUtil";
import PostDto from "@models/dto/rest/receive/post/PostDto";
import DealDto from "@models/dto/rest/receive/deal/DealDto";

export enum PostPageViewState {
    LOGGED_OFF,
    VISITOR_PRIVATE_CHAT,
    INBOX,
    INBOX_DETAIL_CHAT
}

export const getViewState =
    (authState: AuthState, postDto: PostDto, queryPartnerId: string): PostPageViewState => {
    if (postDto?.postId && authState.isLoggedIn) {
        const isOwner = isOp(authState, postDto);

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

export const getPostStatusFromPost = (post?: PostDto): PostStatusEnum =>
    post
        ? post?.postState?.postStatus?.status as unknown as PostStatusEnum
        : PostStatusEnum.POST_SETUP;

export const isStatusPostInit = (postDto: PostDto) =>
    postDto?.postState?.postStatus?.status === stringFromPostStatusEnum(PostStatusEnum.POST_INIT);

export const isChatAllowed = (authState: AuthState, postDto: PostDto) => {
    return isStatusPostInit(postDto)
        || (isOp(authState, postDto) || isPostDealConsultant(authState, postDto));
}

export const isPostEditAllowed = (authState: AuthState, postDto: PostDto) => {
    return isOp(authState, postDto)
        && postDto?.postState?.postStatus?.status === 'POST_INIT';
}

export const isAnswerAllowed = (authState: AuthState, postStatus: PostStatusEnum, dealDto?: DealDto|null) => {
    return postStatus === PostStatusEnum.DEAL_INIT
        && isDealConsultant(authState, dealDto);
};

