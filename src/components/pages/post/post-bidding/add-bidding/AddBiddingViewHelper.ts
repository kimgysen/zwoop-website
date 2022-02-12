import {getRawJwt} from "../../../../../service/jwt/JwtService";
import {saveBiddingApi} from "@api_clients/feature/bidding/BiddingService";
import CreateBidding from "@models/post/bidding/CreateBidding";
import ApiResult from "@api_clients/type/ApiResult";

export const createBidding = async (bidding: CreateBidding): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return saveBiddingApi(bidding, jwt);
}
