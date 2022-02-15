import ApiResult from "@api_clients/type/ApiResult";
import {getRawJwt} from "../../../../../../../service/jwt/JwtService";
import {acceptBiddingApi} from "@api_clients/feature/bidding/BiddingService";
import AcceptBidding from "@models/post/bidding/AcceptBidding";

export const acceptBidding = async (acceptBidding: AcceptBidding): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return acceptBiddingApi(acceptBidding, jwt);
}
