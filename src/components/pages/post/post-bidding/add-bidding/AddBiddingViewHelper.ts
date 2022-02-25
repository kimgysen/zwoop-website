import {getRawJwt} from "../../../../../service/jwt/JwtService";
import {createBiddingApi} from "@api_clients/feature/bidding/BiddingApiClient";
import CreateBiddingDto from "@models/dto/rest/send/bidding/CreateBiddingDto";
import ApiResult from "@api_clients/type/ApiResult";

export const createBidding = async (bidding: CreateBiddingDto): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return createBiddingApi(bidding, jwt);
}
