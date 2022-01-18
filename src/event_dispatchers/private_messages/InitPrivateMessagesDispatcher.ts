import BaseDispatcher from "../BaseDispatcher";
import PrivateMessageReceiveDto from "../../service/stomp/receive/PrivateMessageReceiveDto";

export const ON_INIT_PRIVATE_MESSAGES_LOADING = 'ON_INIT_PRIVATE_MESSAGES_LOADING';
export const ON_INIT_PRIVATE_MESSAGES_RECEIVED = 'ON_INIT_PRIVATE_MESSAGES_RECEIVED';

class InitPrivateMessagesDispatcher extends BaseDispatcher<PrivateMessageReceiveDto[]> {
    constructor() {
        super(ON_INIT_PRIVATE_MESSAGES_RECEIVED, ON_INIT_PRIVATE_MESSAGES_LOADING);
    }
}

let dispatcher: InitPrivateMessagesDispatcher;

export const getInitPrivateMessagesDispatcher = () => {
    if (dispatcher) {
        return dispatcher;
    } else {
        return new InitPrivateMessagesDispatcher();
    }
}
