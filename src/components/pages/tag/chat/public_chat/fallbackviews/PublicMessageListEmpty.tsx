import React, {FC} from "react";
import {Box} from "@chakra-ui/react";


const PublicMessageListEmpty: FC = () => {
    return (
        <Box
            textAlign='left'
            padding='10px'>
            <i>No messages found</i>
        </Box>
    )
}

export default PublicMessageListEmpty;
