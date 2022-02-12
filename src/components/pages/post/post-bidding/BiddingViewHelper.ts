import Post from "@models/post/Post";
import Bidding from "@models/post/bidding/Bidding";
import AuthState from "@models/user/AuthState";
import BiddingUpdateDto from "../../../../service/stomp/dto/receive/post/feature/BiddingUpdateDto";


export const isPostOwner = (post: Post, principalId?: string) =>
    principalId === post?.asker?.userId;

export const principalHasBid = (biddingList: Bidding[], principalId?: string) =>
    !!biddingList?.find(
            (bidding) => bidding.respondent.userId === principalId);

export const isFromPrincipal = (authState: AuthState, biddingUpdate: BiddingUpdateDto) =>
    authState.principalId === biddingUpdate.userId;