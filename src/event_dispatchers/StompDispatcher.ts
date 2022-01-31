import {EventDispatcher} from "event-dispatch";

let stompDispatcher: EventDispatcher;

export const getStompDispatcher = () => {
    if (!stompDispatcher) {
        stompDispatcher = new EventDispatcher();
    }
    return stompDispatcher;
}
