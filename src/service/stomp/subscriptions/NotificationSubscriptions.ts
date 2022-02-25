import {getStompClient} from "../StompService";
import {dispatchCustomMessage, dispatchStompMessage} from "./SubscriptionUtil";
import {
    APP_DEAL_BOX__DEAL_CANCELLED,
    APP_DEAL_BOX__DEAL_OPENED,
    APP_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "../../../models/dto/stomp/receive/notification/NotificationDto";
import {NotificationFeatureType} from "@models/dto/stomp/receive/notification/NotificationType";
import DealInitDto from "@models/dto/stomp/receive/common/deal/DealInitDto";
import DealCancelledDto from "@models/dto/stomp/receive/common/deal/DealCancelledDto";


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
                    dispatchCustomMessage(APP_DEAL_BOX__DEAL_OPENED, notificationDto.dto as DealInitDto);
                    break;

                case NotificationFeatureType.DEAL_CANCELLED:
                    dispatchCustomMessage(APP_DEAL_BOX__DEAL_CANCELLED, notificationDto.dto as DealCancelledDto);
                    break;
            }
        });
}
