import React, {FC} from "react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const PrivateMessageListLoading: FC = () => {
    return (
        <DelayedSpinner timeOutMs={500} />
    )
}

export default PrivateMessageListLoading;
