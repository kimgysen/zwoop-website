import React, {FC} from "react";
import Card from "@components/layout/components/card/Card";

interface BiddingListErrorProps {
    errorMsg: string
}

const BiddingListError: FC<BiddingListErrorProps> = ({ errorMsg }) => {
    return (
        <Card p={ '5' }>
            { errorMsg }
        </Card>
    )
}

export default BiddingListError;
