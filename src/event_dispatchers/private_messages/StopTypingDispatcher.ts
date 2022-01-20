import BaseDispatcher from "../BaseDispatcher";
import TypingDto from "../../service/stomp/receive/TypingDto";


export const ON_STOP_TYPING_RECEIVED = 'ON_STOP_TYPING_RECEIVED';

class StopTypingDispatcher extends BaseDispatcher<TypingDto> {
    constructor() {
        super(ON_STOP_TYPING_RECEIVED, null);
    };
}

let dispatcher: StopTypingDispatcher;

export const getStopTypingDispatcher = () => {
    return dispatcher
        ? dispatcher
        : new StopTypingDispatcher();
}
