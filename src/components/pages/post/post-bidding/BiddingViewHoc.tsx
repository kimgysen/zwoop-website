import {FC, useEffect, useState} from "react";
import AuthState from "@models/user/AuthState";
import Post, {PostStatusEnum} from "@models/post/Post";
import useBidding from "../../../../service/swr/bidding/UseBidding";
import BiddingView from "@components/pages/post/post-bidding/BiddingView";
import BiddingListLoading from "@components/pages/post/post-bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post-bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post-bidding/fallbackviews/BiddingListError";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    BIDDING_UPDATE__BIDDING_ACCEPTED,
    BIDDING_UPDATE__BIDDING_ADDED,
    BIDDING_UPDATE__BIDDING_CHANGED,
    BIDDING_UPDATE__BIDDING_REMOVE_ACCEPTED,
    BIDDING_UPDATE__BIDDING_REMOVED
} from "../../../../event_dispatchers/config/StompEvents";
import BiddingAddedDto from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingAddedDto";
import BiddingChangedDto from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingChangedDto";
import BiddingRemovedDto from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingRemovedDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import {findAcceptedBidding, isSentByPrincipal} from "@components/pages/post/post-bidding/BiddingViewHelper";
import BiddingAcceptedDto from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingAcceptedDto";
import AcceptedBiddingViewHoc from "@components/pages/post/post-bidding/accepted-bidding/AcceptedBiddingViewHoc";
import BiddingRemoveAcceptedDto
    from "../../../../service/stomp/dto/receive/post/feature/bidding/BiddingRemoveAcceptedDto";
import {getPostStatusFromPost} from "@components/pages/post/PostPageHelper";


interface BiddingViewHocProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const BiddingViewHoc: FC<BiddingViewHocProps> = ({ authState, post }) => {
    const { loading, data: biddingList, error, mutate } = useBidding(post?.postId);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(post));
    const [acceptedBidding, setAcceptedBidding] = useState<BiddingAcceptedDto|null>(null);


    useEffect(() => {
        if (biddingList) {
            setAcceptedBidding(
                findAcceptedBidding(biddingList))
        }
    }, [biddingList]);

    useEffect(() => {
        if (post?.postId) {

            stompDispatcher.on(BIDDING_UPDATE__BIDDING_ADDED, (biddingDto: BiddingAddedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, biddingDto))
                    infoToast(`Bidding submitted by ${ biddingDto.nickName }`);
            });

            stompDispatcher.on(BIDDING_UPDATE__BIDDING_CHANGED, (changedBiddingDto: BiddingChangedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, changedBiddingDto))
                    infoToast(`Bidding updated by ${ changedBiddingDto.nickName }`);
            });

            stompDispatcher.on(BIDDING_UPDATE__BIDDING_REMOVED, (removedBiddingDto: BiddingRemovedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, removedBiddingDto))
                    infoToast(`Bidding deleted by ${ removedBiddingDto.nickName }`);
            });

            stompDispatcher.on(BIDDING_UPDATE__BIDDING_ACCEPTED, (acceptedBiddingDto: BiddingAcceptedDto) => {
                mutate();
                setAcceptedBidding(acceptedBiddingDto);
                setPostStatus(PostStatusEnum.IN_PROGRESS);
                if (!isSentByPrincipal(authState, acceptedBiddingDto))
                    infoToast(`${ acceptedBiddingDto.nickName } closed the bidding.`);
            });

            stompDispatcher.on(BIDDING_UPDATE__BIDDING_REMOVE_ACCEPTED, (removeAcceptedBiddingDto: BiddingRemoveAcceptedDto) => {
                mutate();
                setAcceptedBidding(null);
                setPostStatus(PostStatusEnum.OPEN);
                if (!isSentByPrincipal(authState, removeAcceptedBiddingDto)) {
                    infoToast(`${ removeAcceptedBiddingDto.nickName } reopened the bidding.`)
                }
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(BIDDING_UPDATE__BIDDING_ADDED);
            stompDispatcher.remove(BIDDING_UPDATE__BIDDING_CHANGED);
            stompDispatcher.remove(BIDDING_UPDATE__BIDDING_REMOVED);
            stompDispatcher.remove(BIDDING_UPDATE__BIDDING_ACCEPTED);
            stompDispatcher.remove(BIDDING_UPDATE__BIDDING_REMOVE_ACCEPTED);
        }

    }, [post?.postId, authState, mutate]);

    return (
        <>
            {
                postStatus === PostStatusEnum.IN_PROGRESS
                && (
                    <AcceptedBiddingViewHoc
                        authState={ authState }
                        post={ post }
                        biddingAcceptedDto={ acceptedBidding as BiddingAcceptedDto }
                        mutate={ mutate }
                    />
                )
            }
            {
                postStatus === PostStatusEnum.OPEN
                && biddingList
                && <BiddingView
                    authState={ authState }
                    post={ post }
                    postStatus={ postStatus }
                    biddingList={ biddingList }
                    acceptedBidding={ acceptedBidding }
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
