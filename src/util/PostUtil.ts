import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import Bidding from "@models/db/entity/Bidding";


export const isOp = (authState: AuthState, post: Post) =>
    authState?.principalId === post?.op?.userId;


export const isPostBiddingConsultant = (authState: AuthState, biddingItem: Bidding) =>
    authState?.principalId === biddingItem?.consultant?.userId;

export const isPostDealConsultant = (authState: AuthState, post: Post) =>
    authState?.principalId === post?.postState?.deal?.bidding?.consultant?.userId;
