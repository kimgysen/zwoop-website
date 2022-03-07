import {NotificationFeatureType} from "./UserNotificationType";


export default interface NotificationDto<T> {
    notificationType: NotificationFeatureType,
    dto: T
}

