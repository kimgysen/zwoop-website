import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";


export const biddingListIsEmpty = (biddingList: BiddingDto[]) =>
    biddingList && biddingList.length === 0;

export const principalHasBid = (biddingList: BiddingDto[], authState: AuthState) =>
    !!biddingList?.find(
            (bidding) => bidding.consultant.userId === authState?.principalId);
