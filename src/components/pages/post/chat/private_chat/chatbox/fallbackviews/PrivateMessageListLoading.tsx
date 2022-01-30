import React, {FC} from "react";
import {Center, Spinner} from "@chakra-ui/react";


const PrivateMessageListLoading: FC = () => {
    return (
        <Center
            py={'20px'}
            height={'500px'}
        >
            <Spinner/>
        </Center>
    )
}

export default PrivateMessageListLoading;
