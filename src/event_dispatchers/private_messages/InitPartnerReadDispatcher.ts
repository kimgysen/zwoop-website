import BaseDispatcher from "../BaseDispatcher";


export const INIT_PARTNER_READ_LOADING = 'INIT_PARTNER_READ_LOADING';
export const INIT_PARTNER_READ_RECEIVED = 'INIT_PARTNER_READ_RECEIVED';

class InitPartnerReadDispatcher extends BaseDispatcher<boolean> {
    constructor() {
        super(INIT_PARTNER_READ_RECEIVED, INIT_PARTNER_READ_LOADING);
    }
}

let dispatcher: InitPartnerReadDispatcher;

export const getInitPartnerReadDispatcher = () => {
    if (dispatcher) {
        return dispatcher;
    } else {
        return new InitPartnerReadDispatcher();
    }
}
