import React, {FC} from "react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const PublicMessageListLoading: FC = () => {
    return (
        <DelayedSpinner
            timeOutMs={500}
            height={'500px'}
        />
    )
}

export default PublicMessageListLoading;
