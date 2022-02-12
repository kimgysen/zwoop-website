import {getStompClient} from "../StompService";
import {
    APP_INBOX__ON_INBOX_UPDATE_RECEIVED,
    POST_INBOX__ON_INBOX_UPDATE_RECEIVED,
    POST_INBOX__ON_INIT_ITEMS_RECEIVED
} from "../../../event_dispatchers/config/StompEvents";
import {dispatchStompMessage} from "./SubscriptionUtil";


export const initPostInbox = (postId: string) => {
    getStompClient()
        .subscribe(`/app/post/${postId}/inbox.items`, (msg) => {
            dispatchStompMessage(POST_INBOX__ON_INIT_ITEMS_RECEIVED, msg);
        });
}

export const subscribeToInboxUpdates = () => {
    getStompClient()
        .subscribe(`/user/exchange/amq.direct/inbox.item.received`, (msg) => {
            dispatchStompMessage(APP_INBOX__ON_INBOX_UPDATE_RECEIVED, msg);
            dispatchStompMessage(POST_INBOX__ON_INBOX_UPDATE_RECEIVED, msg);
        });
}
