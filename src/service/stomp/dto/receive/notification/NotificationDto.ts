import {NotificationFeatureType} from "./NotificationType";


export default interface NotificationDto<T> {
    notificationType: NotificationFeatureType,
    dto: T
}

