import {getStompClient} from "../StompService";
import {dispatchStompMessage} from "./SubscriptionUtil";
import {APP_INBOX__ON_INIT_ITEMS_RECEIVED} from "../../../event_dispatchers/config/StompEvents";


export const initAppInbox = () => {
    getStompClient()
        .subscribe(`/app/app.inbox.items`, (msg) => {
            dispatchStompMessage(APP_INBOX__ON_INIT_ITEMS_RECEIVED, msg);
        });
}