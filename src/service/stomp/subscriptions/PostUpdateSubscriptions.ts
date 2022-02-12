import {getStompClient} from "../StompService";
import PostUpdateFeatureDto from "../dto/receive/post/PostUpdateFeatureDto";
import {PostUpdateFeatureType} from "../dto/receive/post/PostUpdateFeatureType";
import {
    POST_UPDATE__BIDDING_ACCEPTED,
    POST_UPDATE__BIDDING_ADDED,
    POST_UPDATE__BIDDING_CHANGED,
    POST_UPDATE__BIDDING_REMOVED,
    POST_UPDATE__POST_CHANGED,
    POST_UPDATE__POST_REMOVED
} from "../../../event_dispatchers/config/StompEvents";
import PostChangedDto from "../dto/receive/post/feature/PostChangedDto";
import PostRemovedDto from "../dto/receive/post/feature/PostRemovedDto";
import BiddingAddedDto from "../dto/receive/post/feature/BiddingAddedDto";
import BiddingChangedDto from "../dto/receive/post/feature/BiddingChangedDto";
import BiddingRemovedDto from "../dto/receive/post/feature/BiddingRemovedDto";
import BiddingAcceptedDto from "../dto/receive/post/feature/BiddingAcceptedDto";
import {dispatchCustomMessage} from "./SubscriptionUtil";


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
                    dispatchCustomMessage(POST_UPDATE__BIDDING_ADDED, postUpdateFeatureDto.postUpdateDto as BiddingAddedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_CHANGED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_CHANGED, postUpdateFeatureDto.postUpdateDto as BiddingChangedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_REMOVED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_REMOVED, postUpdateFeatureDto.postUpdateDto as BiddingRemovedDto);
                    break;

                case PostUpdateFeatureType.BIDDING_ACCEPTED:
                    dispatchCustomMessage(POST_UPDATE__BIDDING_ACCEPTED, postUpdateFeatureDto.postUpdateDto as BiddingAcceptedDto);
                    break;

            }
        });
}
