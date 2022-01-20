import BaseDispatcher from "../BaseDispatcher";
import TypingDto from "../../service/stomp/receive/TypingDto";


export const ON_START_TYPING_RECEIVED = 'ON_START_TYPING_RECEIVED';

class StartTypingDispatcher extends BaseDispatcher<TypingDto> {
    constructor() {
        super(ON_START_TYPING_RECEIVED, null);
    };
}

let dispatcher: StartTypingDispatcher;

export const getStartTypingDispatcher = () => {
    return dispatcher
        ? dispatcher
        : new StartTypingDispatcher();
}
