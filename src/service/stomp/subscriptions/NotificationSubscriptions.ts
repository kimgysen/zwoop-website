import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    APP_INBOX__ON_INIT_ITEMS_RECEIVED,
    DEAL_UPDATE__DEAL_CANCELLED,
    DEAL_UPDATE__DEAL_OPENED
} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "../dto/receive/notification/NotificationDto";
import {NotificationFeatureType} from "../dto/receive/notification/NotificationType";
import DealOpenedDto from "../dto/receive/notification/feature/deal/DealOpenedDto";
import {DealCancelledDto} from "../dto/receive/notification/feature/deal/DealCancelledDto";


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

            switch (notificationDto.notificationType) {

                case NotificationFeatureType.DEAL_OPENED:
                    dispatchCustomMessage(DEAL_UPDATE__DEAL_OPENED, notificationDto.dto as DealOpenedDto);
                    break;

                case NotificationFeatureType.DEAL_CANCELLED:
                    dispatchCustomMessage(DEAL_UPDATE__DEAL_CANCELLED, notificationDto.dto as DealCancelledDto);
                    break;
            }
        });
}
