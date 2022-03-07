import AuthState from "@models/auth/AuthState";
import UserDto from "@models/dto/stomp/receive/common/user/UserDto";
import DealDto from "@models/dto/rest/receive/deal/DealDto";


export const getDealCounterpart =
    (authState: AuthState, dealDto: DealDto): UserDto|null => {

        if (isDealOp(authState, dealDto)) {
            return dealDto?.consultant;

        } else if (isDealConsultant(authState, dealDto)) {
            return dealDto?.op;
        }

        return null;
}

export const isDealParticipant = (authState: AuthState, deal?: DealDto|null) =>
    isDealOp(authState, deal) || isDealConsultant(authState, deal);

export const isDealOp = (authState: AuthState, deal?: DealDto|null) =>
    authState?.principalId === deal?.op?.userId;

export const isDealConsultant = (authState: AuthState, deal?: DealDto|null) =>
    authState?.principalId === deal?.consultant?.userId;
