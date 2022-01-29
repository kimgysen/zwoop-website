import React, {FC} from "react";
import {Center, Spinner} from "@chakra-ui/react";


const AppInboxLoading: FC = () => {
    return (
        <Center py={'20px'}>
            <Spinner/>
        </Center>
    )
}

export default AppInboxLoading;
