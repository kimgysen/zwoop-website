import {getStompClient} from "../StompService";
import PostUpdateFeatureDto from "../dto/receive/post/PostUpdateFeatureDto";
import {PostUpdateFeatureType} from "../dto/receive/post/PostUpdateFeatureType";
import {
    BIDDING_UPDATE__BIDDING_ACCEPTED,
    BIDDING_UPDATE__BIDDING_ADDED,
    BIDDING_UPDATE__BIDDING_CHANGED,
    BIDDING_UPDATE__BIDDING_REMOVE_ACCEPTED,
    BIDDING_UPDATE__BIDDING_REMOVED,
    POST_UPDATE__BIDDING_ACCEPTED,
    POST_UPDATE__BIDDING_REMOVE_ACCEPTED,
    POST_UPDATE__POST_CHANGED,
    POST_UPDATE__POST_REMOVED
} from "../../../event_dispatchers/config/StompEvents";
import PostChangedDto from "../dto/receive/post/feature/post/PostChangedDto";
import PostRemovedDto from "../dto/receive/post/feature/post/PostRemovedDto";
import BiddingAddedDto from "../dto/receive/post/feature/bidding/BiddingAddedDto";
import BiddingChangedDto from "../dto/receive/post/feature/bidding/BiddingChangedDto";
import BiddingRemovedDto from "../dto/receive/post/feature/bidding/BiddingRemovedDto";
import BiddingAcceptedDto from "../dto/receive/post/feature/bidding/BiddingAcceptedDto";
import {dispatchCustomMessage} from "./SubscriptionUtil";
import BiddingRemoveAcceptedDto from "../dto/receive/post/feature/bidding/BiddingRemoveAcceptedDto";


export const subscribeToPostUpdates = (postId: string) => {
    getStompClient()
        .subscribe(`/topic/${ postId }.post.updates`, (msg) => {
            const postUpdateFeatureDto = JSON.parse(msg.body) as PostUpdateFeatureDto<any>;

            switch (postUpdateFeatureDto.postUpdateType) {
                case PostUpdateFeatureType.POST_CHANGED:
                    dispatchCustomMessage(POST_UPDATE__POST_CHANGED, postUpdateFeatureDto.postUpdateDto as PostChangedDto);
                    break;

                case PostUpdateFeatureType.POST_REMOVED:
                    dispatchCustomMessage(POST_UPDATE__POST_REMOVED, postUpdateFeatureDto.postUpdateDto as PostRemovedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_ADDED:
                    dispatchCustomMessage(BIDDING_UPDATE__BIDDING_ADDED, postUpdateFeatureDto.postUpdateDto as BiddingAddedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_CHANGED:
                    dispatchCustomMessage(BIDDING_UPDATE__BIDDING_CHANGED, postUpdateFeatureDto.postUpdateDto as BiddingChangedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVED:
                    dispatchCustomMessage(BIDDING_UPDATE__BIDDING_REMOVED, postUpdateFeatureDto.postUpdateDto as BiddingRemovedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_ACCEPTED:
                    dispatchCustomMessage(BIDDING_UPDATE__BIDDING_ACCEPTED, postUpdateFeatureDto.postUpdateDto as BiddingAcceptedDto);
                    dispatchCustomMessage(POST_UPDATE__BIDDING_ACCEPTED, postUpdateFeatureDto.postUpdateDto as BiddingAcceptedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVE_ACCEPTED:
                    dispatchCustomMessage(BIDDING_UPDATE__BIDDING_REMOVE_ACCEPTED, postUpdateFeatureDto.postUpdateDto as BiddingRemoveAcceptedDto);
                    dispatchCustomMessage(POST_UPDATE__BIDDING_REMOVE_ACCEPTED, postUpdateFeatureDto.postUpdateDto as BiddingRemoveAcceptedDto);
                    break;

            }
        });
}
