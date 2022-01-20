import InboxItemReceiveDto from "../../../service/stomp/receive/InboxItemReceiveDto";
import BaseDispatcher from "../../BaseDispatcher";

export const ON_INIT_INBOX_ITEMS_LOADING = 'ON_INIT_INBOX_ITEMS_LOADING';
export const ON_INIT_INBOX_ITEMS_RECEIVED = 'ON_INIT_INBOX_ITEMS_RECEIVED';


class InitPostInboxDispatcher extends BaseDispatcher<InboxItemReceiveDto[]> {
    constructor() {
        super(ON_INIT_INBOX_ITEMS_RECEIVED, ON_INIT_INBOX_ITEMS_LOADING)
    }
}

let dispatcher: InitPostInboxDispatcher;

export const getInitPostInboxDispatcher = () => {
    if (dispatcher) {
        return dispatcher;
    } else {
        return new InitPostInboxDispatcher();
    }
}
