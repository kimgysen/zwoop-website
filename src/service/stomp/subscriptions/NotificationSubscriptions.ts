import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    NOTIFICATION__DEAL_CANCELLED,
    NOTIFICATION__DEAL_INIT,
    NOTIFICATION_BUTTON__POST_NOTIFICATION,
    NOTIFICATION_DROPDOWN__POST_NOTIFICATION
} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "@models/dto/domain-client-dto/notification/queue/NotificationDto";
import {UserNotificationType} from "@models/dto/domain-client-dto/notification/queue/UserNotificationType";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import UserNotificationDto from "@models/dto/domain-client-dto/usernotification/UserNotificationDto";


export const initAppInbox = () => {
    getStompClient()
        .subscribe(`/app/app.inbox.items`, (msg) => {
            dispatchStompMessage(APP_INBOX__ON_INIT_ITEMS_RECEIVED, msg);
        });
}

export const subscribeToNotifications = () => {
    getStompClient()
        .subscribe(`/user/exchange/amq.direct/notification.received`, (msg) => {
            const notificationDto = JSON.parse(msg.body) as NotificationDto<any>;
            console.log(notificationDto);

            switch (notificationDto.userNotificationType) {
                case UserNotificationType[UserNotificationType.DEAL_INIT_NOTIFICATION]:
                    dispatchCustomMessage(NOTIFICATION__DEAL_INIT, notificationDto.dto as DealDto);
                    break;

                case UserNotificationType.DEAL_CANCELLED_NOTIFICATION:
                    dispatchCustomMessage(NOTIFICATION__DEAL_CANCELLED, notificationDto.dto as DealDto);
                    break;

                case UserNotificationType.POST_NOTIFICATION:
                    dispatchCustomMessage(NOTIFICATION_BUTTON__POST_NOTIFICATION, notificationDto.dto as UserNotificationDto);
                    dispatchCustomMessage(NOTIFICATION_DROPDOWN__POST_NOTIFICATION, notificationDto.dto as UserNotificationDto);

            }
        });
}
