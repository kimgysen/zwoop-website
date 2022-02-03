import Post from "@models/post/Post";
import BiddingStatus from "@models/post/BiddingStatus";
import User from "@models/user/User";

export default interface Bidding {
    biddingId: string,
    post: Post,
    respondent: User,
    askPrice: string,
    biddingStatus: BiddingStatus,
    createdAt: Date,
    updatedAt: Date | undefined
}
