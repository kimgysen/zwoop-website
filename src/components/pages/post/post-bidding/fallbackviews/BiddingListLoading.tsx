import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";
import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";


const BiddingListLoading: FC = () => {
    return (
        <Card>
            <DelayedSpinner
                timeOutMs={500}
                height='50px'
            />
        </Card>
    )
}

export default BiddingListLoading;
