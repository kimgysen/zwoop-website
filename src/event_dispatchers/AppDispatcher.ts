import {EventDispatcher} from "event-dispatch";

let appDispatcher: EventDispatcher;

export const getAppDispatcher = () => {
    if (!appDispatcher) {
        appDispatcher = new EventDispatcher();
    }
    return appDispatcher;
}
