import Post, {PostStatusEnum, stringFromPostStatusEnum} from "@models/post/Post";
import Bidding, {BiddingStatusEnum} from "@models/post/bidding/Bidding";
import AuthState from "@models/user/AuthState";
import BiddingUpdateDto from "../../../../service/stomp/dto/receive/post/feature/BiddingUpdateDto";
import BiddingAcceptedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingAcceptedDto";


export const biddingListIsEmpty = (biddingList: Bidding[]) =>
    biddingList && biddingList.length === 0;

export const isPostOwner = (post: Post, principalId?: string) =>
    principalId === post?.asker?.userId;

export const principalIsBidder = (principalId: string, biddingItem: Bidding) =>
    biddingItem?.respondent?.userId === principalId;

export const principalHasBid = (biddingList: Bidding[], principalId?: string) =>
    !!biddingList?.find(
            (bidding) => bidding.respondent.userId === principalId);

export const isSentByPrincipal = (authState: AuthState, biddingUpdate: BiddingUpdateDto) =>
    authState.principalId === biddingUpdate.userId;

export const findAcceptedBidding = (biddingList: Bidding[]): BiddingAcceptedDto|null => {
    if (biddingList) {
        const acceptedBidding = biddingList.find(bidding => bidding.biddingStatus.biddingStatus === BiddingStatusEnum.ACCEPTED);
        return {
            biddingId: acceptedBidding?.biddingId as string,
            userId: acceptedBidding?.respondent?.userId as string,
            nickName: acceptedBidding?.respondent?.nickName as string
        }
    }
    return null;
}

export const getPostStatusFromPost = (post: Post): PostStatusEnum =>
    post?.postStatus.postStatus as unknown as PostStatusEnum;

export const postStatusIsInProcess = (post: Post) =>
    post?.postStatus?.postStatus === stringFromPostStatusEnum(PostStatusEnum.IN_PROGRESS);

