import React, {FC} from "react";
import {Box} from "@chakra-ui/react";


const PrivateMessageListEmpty: FC = () => {
    return (
        <Box p={ '20px' }>
            <i>Send a message!</i>
        </Box>
    )
}

export default PrivateMessageListEmpty;
