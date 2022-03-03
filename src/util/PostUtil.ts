import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import Bidding from "@models/db/entity/Bidding";
import Answer from "@models/db/entity/Answer";


export const isOp = (authState: AuthState, post: Post) =>
    authState?.principalId === post?.op?.userId;


export const isPostBiddingConsultant = (authState: AuthState, biddingItem: Bidding) =>
    authState?.principalId === biddingItem?.consultant?.userId;

export const isPostDealConsultant = (authState: AuthState, post: Post) =>
    authState?.principalId === post?.postState?.deal?.bidding?.consultant?.userId;

export const isAnswerOwner = (authState: AuthState, answer: Answer) =>
    authState?.principalId === answer?.consultant?.userId;
