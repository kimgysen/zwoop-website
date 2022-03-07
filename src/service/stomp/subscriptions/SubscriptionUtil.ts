import {getStompDispatcher} from "../../../event_dispatchers/StompDispatcher";
import {IMessage} from "@stomp/stompjs";

const stompDispatcher = getStompDispatcher();

export const dispatchStompMessage = (eventKey: string, msg: IMessage) => {
    stompDispatcher.dispatch(eventKey, JSON.parse(msg.body));
}

export const dispatchCustomMessage = (eventKey: string, msg: any) => {
    stompDispatcher.dispatch(eventKey, msg);
}
