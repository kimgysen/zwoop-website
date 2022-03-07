import {getStompClient} from "../StompService";
import {dispatchStompMessage} from "./SubscriptionUtil";
import {APP_INBOX__ON_INIT_ITEMS_RECEIVED} from "../../../event_dispatchers/config/StompEvents";
import NotificationDto from "../../../models/dto/stomp/receive/user-notification/NotificationDto";


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

            }
        });
}
