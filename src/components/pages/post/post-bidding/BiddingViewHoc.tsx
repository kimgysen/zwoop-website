import {FC, useEffect} from "react";
import AuthState from "@models/user/AuthState";
import Post from "@models/post/Post";
import useBidding from "../../../../service/swr/bidding/UseBidding";
import BiddingView from "@components/pages/post/post-bidding/BiddingView";
import BiddingListLoading from "@components/pages/post/post-bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post-bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post-bidding/fallbackviews/BiddingListError";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_UPDATE__BIDDING_ADDED,
    POST_UPDATE__BIDDING_CHANGED,
    POST_UPDATE__BIDDING_REMOVED
} from "../../../../event_dispatchers/config/StompEvents";
import BiddingAddedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingAddedDto";
import BiddingChangedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingChangedDto";
import BiddingRemovedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingRemovedDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import {isFromPrincipal} from "@components/pages/post/post-bidding/BiddingViewHelper";


interface BiddingViewHocProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const BiddingViewHoc: FC<BiddingViewHocProps> = ({ authState, post }) => {
    const { loading, data: biddingList, error, mutate } = useBidding(post?.postId);

    useEffect(() => {
        if (post?.postId) {

            stompDispatcher.on(POST_UPDATE__BIDDING_ADDED, (biddingDto: BiddingAddedDto) => {
                mutate();
                if (!isFromPrincipal(authState, biddingDto))
                    infoToast(`${ biddingDto.nickName } added a bidding`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_CHANGED, (biddingDto: BiddingChangedDto) => {
                mutate();
                if (!isFromPrincipal(authState, biddingDto))
                    infoToast(`${ biddingDto.nickName } changed the bidding`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_REMOVED, (biddingDto: BiddingRemovedDto) => {
                mutate();
                if (!isFromPrincipal(authState, biddingDto))
                    infoToast(`${ biddingDto.nickName } removed the bidding`);
            });

        }

        return function cleanUp() {
            stompDispatcher.remove(POST_UPDATE__BIDDING_ADDED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_CHANGED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_REMOVED);
        }

    }, [post?.postId, authState, mutate]);

    return (
        <>
            {
                biddingList
                && <BiddingView
                    authState={ authState }
                    post={ post }
                    biddingList={ biddingList }
                    mutate={ mutate }
                />
            }
            {
                loading
                && <BiddingListLoading />
            }
            {
                !loading
                && !error
                && biddingList
                && biddingList.length === 0
                && <BiddingListEmpty />
            }
            {
                error
                && <BiddingListError
                    errorMsg={ error.data } />
            }
        </>
    )
}

export default BiddingViewHoc;
