import React, {FC} from "react";
import Post, {PostStatusEnum} from "@models/post/Post";
import AuthState from "@models/user/AuthState";
import {biddingListIsEmpty, isPostOwner, principalHasBid} from "@components/pages/post/post-bidding/BiddingViewHelper";
import AddBiddingViewHoc from "@components/pages/post/post-bidding/add-bidding/AddBiddingViewHoc";
import Bidding from "@models/post/bidding/Bidding";
import BiddingList from "@components/pages/post/post-bidding/bidding-list/BiddingList";
import {KeyedMutator} from "swr";
import Card from "@components/layout/components/card/Card";
import BiddingAcceptedDto from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingAcceptedDto";


interface BiddingViewProps {
    authState: AuthState,
    post: Post,
    postStatus: PostStatusEnum,
    biddingList: Bidding[],
    acceptedBidding: BiddingAcceptedDto|null,
    mutate: KeyedMutator<Bidding[]>
}

const BiddingView: FC<BiddingViewProps> = (
    { authState, post, postStatus, biddingList, acceptedBidding, mutate }) => {

    return (
        <>
            {
                authState.isLoggedIn
                && !isPostOwner(post, authState.principalId)
                && !principalHasBid(biddingList, authState.principalId)
                && (
                    <Card color='teal.50'>
                        <AddBiddingViewHoc
                            authState={ authState }
                            post={ post }
                            mutate={ mutate }
                        />
                    </Card>
                )
            }
            {
                !biddingListIsEmpty(biddingList)
                && (
                    <Card>
                        <BiddingList
                            post={ post }
                            postStatus={ postStatus }
                            principalId={ authState?.principalId as string }
                            biddingList={ biddingList }
                            acceptedBidding={ acceptedBidding }
                            mutate={ mutate }
                        />
                    </Card>
                )
            }
        </>
    )
}

export default BiddingView;
