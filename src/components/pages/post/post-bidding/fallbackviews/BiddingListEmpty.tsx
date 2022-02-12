import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";

const BiddingListEmpty: FC = () => {
    return (
        <Card p={'10px'}>
            <i>No current biddings</i>
        </Card>
    )
}

export default BiddingListEmpty;
