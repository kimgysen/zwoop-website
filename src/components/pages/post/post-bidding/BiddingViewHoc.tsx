import {FC, useEffect, useState} from "react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import useBidding from "../../../../service/swr/bidding/UseBidding";
import BiddingView from "@components/pages/post/post-bidding/BiddingView";
import BiddingListLoading from "@components/pages/post/post-bidding/fallbackviews/BiddingListLoading";
import BiddingListEmpty from "@components/pages/post/post-bidding/fallbackviews/BiddingListEmpty";
import BiddingListError from "@components/pages/post/post-bidding/fallbackviews/BiddingListError";
import {getStompDispatcher} from "../../../../event_dispatchers/StompDispatcher";
import {
    POST_UPDATE__BIDDING_ADDED,
    POST_UPDATE__BIDDING_CHANGED,
    POST_UPDATE__BIDDING_REMOVED,
    POST_UPDATE__DEAL_CANCELLED,
    POST_UPDATE__DEAL_INIT
} from "../../../../event_dispatchers/config/StompEvents";
import BiddingChangedDto from "../../../../models/dto/stomp/receive/post/feature/bidding/BiddingChangedDto";
import BiddingRemovedDto from "../../../../models/dto/stomp/receive/post/feature/bidding/BiddingRemovedDto";
import {infoToast} from "@components/widgets/toast/AppToast";
import DealInitViewHoc from "@components/pages/post/post-deal/deal-init/DealInitViewHoc";
import {getPostStatusFromPost} from "@components/pages/post/PostPageHelper";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import BiddingUpdateDto from "@models/dto/stomp/receive/post/feature/bidding/BiddingUpdateDto";
import Deal from "@models/db/entity/Deal";


interface BiddingViewHocProps {
    authState: AuthState,
    post: Post
}

const stompDispatcher = getStompDispatcher();

const BiddingViewHoc: FC<BiddingViewHocProps> = ({ authState, post }) => {
    const { loading, data: biddingList, error, mutate } = useBidding(post?.postId);
    const [postStatus, setPostStatus] = useState<PostStatusEnum>(getPostStatusFromPost(post));
    const [deal, setDeal] = useState<Deal|null|undefined>(post?.postState?.deal);

    useEffect(() => {
        setPostStatus(getPostStatusFromPost(post));
    }, [post?.postState?.postStatus])

    useEffect(() => {
        if (post?.postId) {
            stompDispatcher.on(POST_UPDATE__BIDDING_ADDED, (biddingDto: BiddingUpdateDto) => {
                mutate();
                infoToast(`Bidding submitted by ${ biddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_CHANGED, (changedBiddingDto: BiddingChangedDto) => {
                mutate();
                infoToast(`Bidding updated by ${ changedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__BIDDING_REMOVED, (removedBiddingDto: BiddingRemovedDto) => {
                mutate();
                infoToast(`Bidding deleted by ${ removedBiddingDto?.consultant?.nickName }`);
            });

            stompDispatcher.on(POST_UPDATE__DEAL_INIT, (dealDto: Deal) => {
                setDeal(dealDto);
                setPostStatus(PostStatusEnum.DEAL_INIT);
            });

            stompDispatcher.on(POST_UPDATE__DEAL_CANCELLED, () => {
                mutate();
                setDeal(null);
                setPostStatus(PostStatusEnum.POST_INIT);
            });
        }

        return function cleanUp() {
            stompDispatcher.remove(POST_UPDATE__BIDDING_ADDED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_CHANGED);
            stompDispatcher.remove(POST_UPDATE__BIDDING_REMOVED);
            stompDispatcher.remove(POST_UPDATE__DEAL_INIT);
            stompDispatcher.remove(POST_UPDATE__DEAL_CANCELLED);
        }

    }, [post?.postId, authState, mutate]);

    return (
        <>
            {
                postStatus === PostStatusEnum.DEAL_INIT
                && !!deal
                && (
                    <DealInitViewHoc
                        authState={ authState }
                        post={ post }
                        deal={ deal }
                    />
                )
            }
            {
                postStatus === PostStatusEnum.POST_INIT
                && biddingList
                && <BiddingView
                    authState={ authState }
                    post={ post }
                    postStatus={ postStatus }
                    biddingList={ biddingList }
                    deal={ deal }
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
