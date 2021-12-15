import {isAlphaNumeric} from "../../../../../util/StringUtil";
import InvalidNickNameException from "@components/layout/navbar/modal/content/exception/InvalidNickNameException";
import InvalidRegistrationException
    from "@components/layout/navbar/modal/content/exception/InvalidRegistrationException";


export const validateNickName = (nickName: string) => {
    if (nickName.length > 2) {
        if (!isAlphaNumeric(nickName)) {
            throw new InvalidNickNameException('Only alpha numeric characters allowed');

        }

    } else {
        throw new InvalidNickNameException('Min 3 characters required');

    }

}

export const validateRegistration = (publicAddressTrx: string | undefined, nickName: string) => {
    if (!nickName) {
        throw new InvalidRegistrationException("Nickname is empty.");
    }

    validateNickName(nickName);

    if (!publicAddressTrx) {
        throw new InvalidRegistrationException("Please log in to your Tron wallet.");
    }

}
