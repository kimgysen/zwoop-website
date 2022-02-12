import React, {FC} from "react";
import Post from "@models/post/Post";
import AuthState from "@models/user/AuthState";
import {isPostOwner, principalHasBid} from "@components/pages/post/post-bidding/BiddingViewHelper";
import AddBiddingViewHoc from "@components/pages/post/post-bidding/add-bidding/AddBiddingViewHoc";
import Bidding from "@models/post/bidding/Bidding";
import BiddingList from "@components/pages/post/post-bidding/bidding-list/BiddingList";
import {KeyedMutator} from "swr";
import Card from "@components/layout/components/card/Card";


interface BiddingViewProps {
    authState: AuthState,
    post: Post,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>
}

const BiddingView: FC<BiddingViewProps> = (
    { authState, post, biddingList, mutate }) => {

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
                biddingList.length > 0
                && (
                    <Card>
                        <BiddingList
                            post={ post }
                            principalId={ authState?.principalId as string }
                            biddingList={ biddingList }
                            mutate={ mutate }
                        />
                    </Card>
                )
            }
        </>
    )
}

export default BiddingView;
