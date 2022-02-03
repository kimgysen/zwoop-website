import React, {FC} from "react";
import {Box} from "@chakra-ui/react";

const BiddingListEmpty: FC = () => {
    return (
        <Box p={ 5 }>
            <i>No current biddings</i>
        </Box>
    )
}

export default BiddingListEmpty;
