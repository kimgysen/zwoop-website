import Bidding from "@models/db/entity/Bidding";
import AuthState from "@models/auth/AuthState";
import BiddingUpdateDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingUpdateDto";


export const biddingListIsEmpty = (biddingList: Bidding[]) =>
    biddingList && biddingList.length === 0;

export const principalHasBid = (biddingList: Bidding[], authState: AuthState) =>
    !!biddingList?.find(
            (bidding) => bidding.consultant.userId === authState?.principalId);

export const isSentByPrincipal = (authState: AuthState, biddingUpdate: BiddingUpdateDto) =>
    authState?.principalId === biddingUpdate?.consultant?.userId;
