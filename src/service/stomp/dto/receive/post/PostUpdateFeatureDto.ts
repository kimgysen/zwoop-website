import {PostUpdateFeatureType} from "./PostUpdateFeatureType";


export default interface PostUpdateFeatureDto<T> {
    postUpdateType: PostUpdateFeatureType,
    postUpdateDto: T
}

