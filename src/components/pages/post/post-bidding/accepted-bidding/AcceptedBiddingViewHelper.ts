import ApiResult from "@api_clients/type/ApiResult";
import {getRawJwt} from "../../../../../service/jwt/JwtService";
import {unAcceptBiddingApi} from "@api_clients/feature/bidding/BiddingService";
import UnAcceptBidding from "@models/post/bidding/UnAcceptBidding";


export const unAcceptBidding = async (unAcceptBidding: UnAcceptBidding): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return unAcceptBiddingApi(unAcceptBidding, jwt);
}
