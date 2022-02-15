import Post from "@models/post/Post";
import BiddingStatus from "@models/post/bidding/BiddingStatus";
import User from "@models/user/User";
import Currency from "@models/post/Currency";

export enum BiddingStatusEnum {
    PENDING= "PENDING",
    ACCEPTED = "ACCEPTED"
}


export default interface Bidding {
    biddingId: string,
    post: Post,
    respondent: User,
    askPrice: string,
    currency: Currency,
    biddingStatus: BiddingStatus,
    createdAt: Date,
    updatedAt: Date | undefined
}
