import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";
import React, {FC} from "react";


const BiddingListLoading: FC = () => {
    return <DelayedSpinner
        timeOutMs={500}
        height='50px'
    />
}

export default BiddingListLoading;
