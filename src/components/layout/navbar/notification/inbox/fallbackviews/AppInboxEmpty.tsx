import React, {FC} from "react";
import {Center} from "@chakra-ui/react";


const AppInboxEmpty: FC = () => {
    return (
        <Center p={ 5 }>
            <i>No messages</i>
        </Center>
    )
}

export default AppInboxEmpty;
