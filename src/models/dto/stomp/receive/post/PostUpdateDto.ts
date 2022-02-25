import {PostUpdateFeatureType} from "./PostUpdateFeatureType";


export default interface PostUpdateDto<T> {
    postUpdateType: PostUpdateFeatureType,
    dto: T
}

