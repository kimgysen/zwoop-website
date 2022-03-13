import AuthState from "@models/auth/AuthState";
import BiddingDto from "@models/dto/domain-client-dto/bidding/BiddingDto";


export const biddingListIsEmpty = (biddingList: BiddingDto[]) =>
    biddingList && biddingList.length === 0;

export const principalHasBid = (biddingList: BiddingDto[], authState: AuthState) =>
    !!biddingList?.find(
            (bidding) => bidding.consultant.userId === authState?.principalId);
