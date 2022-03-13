import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    APP_DEAL_BOX__DEAL_INIT,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    APP_NOTIFICATION_BOX__POST_NOTIFICATION
} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "@models/dto/domain-client-dto/notification/queue/NotificationDto";
import {UserNotificationType} from "@models/dto/domain-client-dto/notification/queue/UserNotificationType";
import DealDto from "@models/dto/domain-client-dto/deal/DealDto";
import {UserNotificationTypeEnum} from "@models/enums/UserNotificationTypeEnum";


export const initAppInbox = () => {
    getStompClient()
        .subscribe(`/app/app.inbox.items`, (msg) => {
            dispatchStompMessage(APP_INBOX__ON_INIT_ITEMS_RECEIVED, msg);
        });
}

export const subscribeToNotifications = () => {
    getStompClient()
        .subscribe(`/user/exchange/amq.direct/notification.received`, (msg) => {
            const notificationDto = JSON.parse(msg.body) as NotificationDto<DealDto>;

            switch (notificationDto.userNotificationType) {
                case UserNotificationType[UserNotificationType.POST_NOTIFICATION]:
                    if (notificationDto.userNotificationType === UserNotificationTypeEnum.DEAL_INIT.toString()) {
                        dispatchCustomMessage(APP_DEAL_BOX__DEAL_INIT, notificationDto.dto as DealDto);

                    } else if (notificationDto.userNotificationType === UserNotificationTypeEnum.DEAL_CANCELLED.toString()) {
                        dispatchCustomMessage(APP_DEAL_BOX__DEAL_CANCELLED, notificationDto.dto as DealDto);

                    } else {
                        dispatchCustomMessage(APP_NOTIFICATION_BOX__POST_NOTIFICATION, notificationDto.dto);
                    }
                    break;

            }
        });
}
