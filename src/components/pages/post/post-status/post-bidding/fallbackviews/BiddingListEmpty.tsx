import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";

const BiddingListEmpty: FC = () => {
    return (
        <Card p={'10px'}>
            <i>The bidding is empty</i>
        </Card>
    )
}

export default BiddingListEmpty;
