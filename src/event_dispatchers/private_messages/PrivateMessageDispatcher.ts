import PrivateMessageReceiveDto from "../../service/stomp/receive/PrivateMessageReceiveDto";
import BaseDispatcher from "../BaseDispatcher";

export const ON_PRIVATE_MESSAGE_LOADING = 'ON_PRIVATE_MESSAGE_LOADING';
export const ON_PRIVATE_MESSAGE_RECEIVED = 'ON_PRIVATE_MESSAGE_RECEIVED';


class PrivateMessageDispatcher extends BaseDispatcher<PrivateMessageReceiveDto> {
    constructor() {
        super(ON_PRIVATE_MESSAGE_RECEIVED, ON_PRIVATE_MESSAGE_LOADING);
    }
}

let dispatcher: PrivateMessageDispatcher;

export const getPrivateMessageDispatcher = () => {
    if (dispatcher) {
        return dispatcher;
    } else {
        return new PrivateMessageDispatcher();
    }
}
