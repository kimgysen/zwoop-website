import Post from "@models/db/entity/Post";
import User from "@models/db/entity/User";
import Currency from "@models/db/entity/Currency";


export default interface Bidding {
    biddingId: string,
    post: Post,
    consultant: User,
    askPrice: string,
    currency: Currency,
    createdAt: Date,
    updatedAt: Date | undefined
}
