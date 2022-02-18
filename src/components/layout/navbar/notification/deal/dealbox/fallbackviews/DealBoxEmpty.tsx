import React, {FC} from "react";
import {Center} from "@chakra-ui/react";


const DealBoxEmpty: FC = () => {
    return (
        <Center p={ 5 }>
            <i>No current deals</i>
        </Center>
    )
}

export default DealBoxEmpty;
