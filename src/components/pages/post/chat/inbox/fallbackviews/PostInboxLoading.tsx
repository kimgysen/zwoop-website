import React, {FC} from "react";
import {Center, Spinner} from "@chakra-ui/react";


const PostInboxLoading: FC = () => {
    return (
        <Center py={'20px'}>
            <Spinner/>
        </Center>
    )
}

export default PostInboxLoading;
