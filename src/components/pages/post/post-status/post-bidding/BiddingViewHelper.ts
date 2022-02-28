import Bidding from "@models/db/entity/Bidding";
import AuthState from "@models/auth/AuthState";


export const biddingListIsEmpty = (biddingList: Bidding[]) =>
    biddingList && biddingList.length === 0;

export const principalHasBid = (biddingList: Bidding[], authState: AuthState) =>
    !!biddingList?.find(
            (bidding) => bidding.consultant.userId === authState?.principalId);
