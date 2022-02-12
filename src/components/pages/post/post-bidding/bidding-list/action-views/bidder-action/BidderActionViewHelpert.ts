import CreateBidding from "@models/post/bidding/CreateBidding";
import ApiResult from "@api_clients/type/ApiResult";
import {getRawJwt} from "../../../../../../../service/jwt/JwtService";
import {deleteBiddingApi, saveBiddingApi} from "@api_clients/feature/bidding/BiddingService";
import DeleteBidding from "@models/post/bidding/DeleteBidding";


export const updateBidding = async (bidding: CreateBidding): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return saveBiddingApi(bidding, jwt);
}

export const deleteBidding = async (deleteBidding: DeleteBidding): Promise<ApiResult<boolean>> => {
    const jwt = await getRawJwt();
    return deleteBiddingApi(deleteBidding, jwt);
}
