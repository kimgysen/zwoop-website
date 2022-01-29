import {EventDispatcher} from "event-dispatch";

let eventDispatcher: EventDispatcher;

export const getStompDispatcher = () => {
    if (!eventDispatcher) {
        eventDispatcher = new EventDispatcher();
    }
    return eventDispatcher;
}
