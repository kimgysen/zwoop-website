import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import {biddingListIsEmpty, principalHasBid} from "@components/pages/post/post-status/post-bidding/BiddingViewHelper";
import AddBiddingViewHoc from "@components/pages/post/post-status/post-bidding/add-bidding/AddBiddingViewHoc";
import BiddingList from "@components/pages/post/post-status/post-bidding/bidding-list/BiddingList";
import Card from "@components/layout/components/card/Card";
import {isOp} from "../../../../../util/PostUtil";
import BiddingListLoading from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post-status/post-bidding/fallbackviews/BiddingListError";
import ApiResult from "@api_clients/type/ApiResult";
import {getBiddingItemsApi} from "@api_clients/feature/bidding/BiddingApiClient";
import {getStompDispatcher} from "../../../../../event_dispatchers/StompDispatcher";
import {
    POST_STATUS__BIDDING_ADDED,
    POST_STATUS__BIDDING_CHANGED,
    POST_STATUS__BIDDING_REMOVED
} from "../../../../../event_dispatchers/config/StompEvents";
import {infoToast} from "@components/widgets/toast/AppToast";
import BiddingDto from "@models/dto/rest/receive/bidding/BiddingDto";
import PostDto from "@models/dto/rest/receive/post/PostDto";


interface BiddingViewProps {
    authState: AuthState,
    postDto: PostDto
}

const stompDispatcher = getStompDispatcher();

const BiddingViewHoc: FC<BiddingViewProps> = (
    { authState, postDto }) => {

    const defaultResult = { loading: false, success: null, error: null };
    const [biddingListRes, setBiddingListRes] = useState<ApiResult<BiddingDto[]>>(defaultResult);

    const getBiddingItems = async () => {
        if (postDto?.postId) {
            setBiddingListRes({ ...defaultResult, loading: true })
            const res = await getBiddingItemsApi(postDto?.postId)
            setBiddingListRes(res);
        }
    }

    useEffect(() => {
        (async () => {
            await getBiddingItems();
        })();
    }, [postDto?.postId]);

    useEffect(() => {
        if (postDto?.postId) {
            stompDispatcher.on(POST_STATUS__BIDDING_ADDED, async (biddingDto: BiddingDto) => {
                infoToast(`Bidding submitted by ${ biddingDto?.consultant?.nickName }`);
                await getBiddingItems();
            });

            stompDispatcher.on(POST_STATUS__BIDDING_CHANGED, async (biddingDto: BiddingDto) => {
                infoToast(`Bidding updated by ${ biddingDto?.consultant?.nickName }`);
                await getBiddingItems();
            });

            stompDispatcher.on(POST_STATUS__BIDDING_REMOVED, async (biddingDto: BiddingDto) => {
                infoToast(`Bidding deleted by ${ biddingDto?.consultant?.nickName }`);
                await getBiddingItems();
            });

            return function cleanUp() {
                stompDispatcher.remove(POST_STATUS__BIDDING_ADDED);
                stompDispatcher.remove(POST_STATUS__BIDDING_CHANGED);
                stompDispatcher.remove(POST_STATUS__BIDDING_REMOVED);
            }
        }
    }, [postDto?.postId]);

    return (
        <>
            {
                authState.isLoggedIn
                && !isOp(authState, postDto)
                && biddingListRes.success
                && !principalHasBid(biddingListRes.success, authState)
                && (
                    <Card color='teal.50'>
                        <AddBiddingViewHoc
                            authState={ authState }
                            postDto={ postDto }
                        />
                    </Card>
                )
            }
            {
                biddingListRes?.loading
                && <BiddingListLoading />
            }
            {
                biddingListRes?.error
                && <BiddingListError
                    errorMsg={ biddingListRes?.error } />
            }
            {
                biddingListRes.success
                && biddingListIsEmpty(biddingListRes.success)
                && <BiddingListEmpty />
            }
            {
                biddingListRes.success
                && !biddingListIsEmpty(biddingListRes.success)
                && (
                    <Card>
                        <BiddingList
                            postDto={ postDto }
                            authState={ authState }
                            biddingDtoList={ biddingListRes.success }
                        />
                    </Card>
                )
            }
        </>
    )
}

export default BiddingViewHoc;
