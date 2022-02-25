import React, {FC} from "react";
import Post from "@models/db/entity/Post";
import AuthState from "@models/auth/AuthState";
import {biddingListIsEmpty, principalHasBid} from "@components/pages/post/post-bidding/BiddingViewHelper";
import AddBiddingViewHoc from "@components/pages/post/post-bidding/add-bidding/AddBiddingViewHoc";
import Bidding from "@models/db/entity/Bidding";
import BiddingList from "@components/pages/post/post-bidding/bidding-list/BiddingList";
import {KeyedMutator} from "swr";
import Card from "@components/layout/components/card/Card";
import {isOp} from "../../../../util/PostUtil";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import Deal from "@models/db/entity/Deal";


interface BiddingViewProps {
    authState: AuthState,
    post: Post,
    postStatus: PostStatusEnum,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>,
    deal?: Deal|null,
}

const BiddingView: FC<BiddingViewProps> = (
    { authState, post, postStatus, biddingList, mutate, deal }) => {

    return (
        <>
            {
                authState.isLoggedIn
                && !isOp(authState, post)
                && !principalHasBid(biddingList, authState)
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
                            authState={ authState }
                            biddingList={ biddingList }
                            deal={ deal }
                            mutate={ mutate }
                        />
                    </Card>
                )
            }
        </>
    )
}

export default BiddingView;
