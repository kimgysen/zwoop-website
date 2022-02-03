import React, {FC} from "react";
import {Box} from "@chakra-ui/react";


const PostInboxEmpty: FC = () => {
    return (
        <Box p={ 5 }>
            <i>No messages</i>
        </Box>
    )
}

export default PostInboxEmpty;
