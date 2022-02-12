import {PrivateChatFeatureType} from "./PrivateChatFeatureType";


export default interface PrivateChatFeatureDto<T> {
    featureType: PrivateChatFeatureType,
    featureDto: T
}
