import React, {FC} from "react";
import {Center} from "@chakra-ui/react";


const NotificationBoxEmpty: FC = () => {
    return (
        <Center p={ 5 }>
            <i>No current notifications</i>
        </Center>
    )
}

export default NotificationBoxEmpty;
