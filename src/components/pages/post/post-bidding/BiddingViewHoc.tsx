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
    POST_UPDATE__BIDDING_ACCEPTED,
    POST_UPDATE__BIDDING_ADDED,
    POST_UPDATE__BIDDING_CHANGED,
    POST_UPDATE__BIDDING_REMOVE_ACCEPTED,
    POST_UPDATE__BIDDING_REMOVED
} from "../../../../event_dispatchers/config/StompEvents";
import BiddingAddedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingAddedDto";
import BiddingChangedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingChangedDto";
import BiddingRemovedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingRemovedDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import {
    findAcceptedBidding,
    getPostStatusFromPost,
    isSentByPrincipal
} from "@components/pages/post/post-bidding/BiddingViewHelper";
import BiddingAcceptedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingAcceptedDto";
import AcceptedBiddingView from "@components/pages/post/post-bidding/accepted-bidding/AcceptedBiddingView";
import BiddingRemoveAcceptedDto from "../../../../service/stomp/dto/receive/post/feature/BiddingRemoveAcceptedDto";


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

            stompDispatcher.on(POST_UPDATE__BIDDING_ADDED, (biddingDto: BiddingAddedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, biddingDto))
                    infoToast(`Bidding submitted by ${ biddingDto.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_CHANGED, (changedBiddingDto: BiddingChangedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, changedBiddingDto))
                    infoToast(`Bidding updated by ${ changedBiddingDto.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_REMOVED, (removedBiddingDto: BiddingRemovedDto) => {
                mutate();
                if (!isSentByPrincipal(authState, removedBiddingDto))
                    infoToast(`Bidding deleted by ${ removedBiddingDto.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_ACCEPTED, (acceptedBiddingDto: BiddingAcceptedDto) => {
                mutate();
                setAcceptedBidding(acceptedBiddingDto);
                setPostStatus(PostStatusEnum.IN_PROGRESS);
                if (!isSentByPrincipal(authState, acceptedBiddingDto))
                    infoToast(`${ acceptedBiddingDto.nickName } closed the bidding.`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_REMOVE_ACCEPTED, (removeAcceptedBiddingDto: BiddingRemoveAcceptedDto) => {
                mutate();
                setAcceptedBidding(null);
                setPostStatus(PostStatusEnum.OPEN);
                if (!isSentByPrincipal(authState, removeAcceptedBiddingDto)) {
                    infoToast(`${ removeAcceptedBiddingDto.nickName } reopened the bidding.`)
                }
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(POST_UPDATE__BIDDING_ADDED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_CHANGED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_REMOVED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_ACCEPTED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_REMOVE_ACCEPTED);
        }

    }, [post?.postId, authState, mutate]);

    return (
        <>
            {
                postStatus === PostStatusEnum.IN_PROGRESS
                && (
                    <AcceptedBiddingView
                        biddingAcceptedDto={ acceptedBidding as BiddingAcceptedDto }
                    />
                )
            }
            {
                biddingList
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
