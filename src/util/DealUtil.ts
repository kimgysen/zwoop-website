import AuthState from "@models/auth/AuthState";
import DealBoxDto from "@models/dto/stomp/receive/dealbox/DealBoxDto";
import UserDto from "@models/dto/stomp/receive/common/user/UserDto";


export const getDealCounterpart =
    (authState: AuthState, dealBoxDto: DealBoxDto): UserDto|null => {
        const principalId = authState?.principalId;

        if (principalId === dealBoxDto?.op.userId) {
            return dealBoxDto?.consultant;

        } else if (principalId === dealBoxDto?.consultant?.userId) {
            return dealBoxDto?.op;
        }

        return null;
}
