import React, {FC} from "react";
import {Box} from "@chakra-ui/react";

interface BiddingListErrorProps {
    errorMsg: string
}

const BiddingListError: FC<BiddingListErrorProps> = ({ errorMsg }) => {
    return (
        <Box p={ 5 }>{ errorMsg }</Box>
    )
}

export default BiddingListError;
