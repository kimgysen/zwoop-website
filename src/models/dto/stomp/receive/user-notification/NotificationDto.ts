import {UserNotificationType} from "./UserNotificationType";


export default interface NotificationDto<T> {
    userNotificationType: UserNotificationType;
    dto: T
}

