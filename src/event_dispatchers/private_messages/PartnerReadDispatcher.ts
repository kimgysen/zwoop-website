import PartnerReadDto from "../../service/stomp/receive/PartnerReadDto";
import BaseDispatcher from "../BaseDispatcher";


export const ON_PARTNER_READ_LOADING = 'ON_PARTNER_READ_LOADING';
export const ON_PARTNER_READ_RECEIVED = 'ON_PARTNER_READ_RECEIVED';

class PartnerReadDispatcher extends BaseDispatcher<PartnerReadDto> {
    constructor() {
        super(ON_PARTNER_READ_RECEIVED, null);
    }
}

let dispatcher: PartnerReadDispatcher;

export const getPartnerReadDispatcher = () => {
    if (dispatcher) {
        return dispatcher;
    } else {
        return new PartnerReadDispatcher();
    }
}
