import React, {FC} from "react";
import Post from "@models/db/entity/Post";
import AuthState from "@models/auth/AuthState";
import {biddingListIsEmpty, principalHasBid} from "@components/pages/post/post-status/post-bidding/BiddingViewHelper";
import AddBiddingViewHoc from "@components/pages/post/post-status/post-bidding/add-bidding/AddBiddingViewHoc";
import Bidding from "@models/db/entity/Bidding";
import BiddingList from "@components/pages/post/post-status/post-bidding/bidding-list/BiddingList";
import {KeyedMutator} from "swr";
import Card from "@components/layout/components/card/Card";
import {isOp} from "../../../../../util/PostUtil";
import BiddingListLoading from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListError";


interface BiddingViewProps {
    authState: AuthState,
    post: Post,
    loading: boolean,
    errorMsg: string,
    biddingList: Bidding[],
    mutate: KeyedMutator<Bidding[]>,
}

const BiddingView: FC<BiddingViewProps> = (
    { authState, post, loading, errorMsg, biddingList, mutate }) => {

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
                loading
                && <BiddingListLoading />
            }
            {
                errorMsg
                && <BiddingListError
                    errorMsg={ errorMsg } />
            }
            {
                !loading
                && !errorMsg
                && biddingListIsEmpty(biddingList)
                && <BiddingListEmpty />
            }
            {
                !biddingListIsEmpty(biddingList)
                && (
                    <Card>
                        <BiddingList
                            post={ post }
                            authState={ authState }
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
