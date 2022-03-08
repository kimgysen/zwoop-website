import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";


export const isOp = (authState: AuthState, postDto: PostDto) =>
    authState?.principalId === postDto?.op?.userId;


export const isBiddingPostConsultant = (authState: AuthState, biddingDto: BiddingDto) =>
    authState?.principalId === biddingDto?.consultant?.userId;

export const isBiddingPostOp = (authState: AuthState, biddingDto: BiddingDto) =>
    authState?.principalId === biddingDto?.op?.userId;

export const isPostDealConsultant = (authState: AuthState, postDto: PostDto) =>
    authState?.principalId === postDto?.postState?.deal?.consultant?.userId;

export const isAnswerOwner = (authState: AuthState, answerDto: AnswerDto) =>
    authState?.principalId === answerDto?.consultant?.userId;

export const isAnswerPostOp = (authState: AuthState, answerDto: AnswerDto) =>
    authState?.principalId === answerDto?.op?.userId;
