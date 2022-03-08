import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    APP_DEAL_BOX__DEAL_INIT,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "../../../models/dto/stomp/receive/user-notification/NotificationDto";
import {UserNotificationType} from "@models/dto/stomp/receive/user-notification/UserNotificationType";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


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
                case UserNotificationType[UserNotificationType.DEAL_INIT]:
                    dispatchCustomMessage(APP_DEAL_BOX__DEAL_INIT, notificationDto.dto as DealDto);
                    break;

                case UserNotificationType.DEAL_CANCELLED.toString():
                    dispatchCustomMessage(APP_DEAL_BOX__DEAL_CANCELLED, notificationDto.dto as DealDto);
                    break;

            }
        });
}
