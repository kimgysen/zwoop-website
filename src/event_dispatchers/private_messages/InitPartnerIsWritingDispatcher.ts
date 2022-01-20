import BaseDispatcher from "../BaseDispatcher";


export const INIT_PARTNER_IS_WRITING_RECEIVED = 'INIT_PARTNER_IS_WRITING_RECEIVED';

class InitPartnerIsWritingDispatcher extends BaseDispatcher<boolean> {
    constructor() {
        super (INIT_PARTNER_IS_WRITING_RECEIVED, null);
    }
}

let dispatcher: InitPartnerIsWritingDispatcher;

export const getInitPartnerIsWritingDispatcher = () => {
    return dispatcher
        ? dispatcher
        : new InitPartnerIsWritingDispatcher;
}
