import {PostUpdateType} from "./PostUpdateType";


export default interface PostUpdateDto<T> {
    postUpdateType: PostUpdateType,
    dto: T
}

