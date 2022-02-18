import React, {FC} from "react";
import {Center} from "@chakra-ui/react";
import DelayedSpinner from "@components/widgets/delayed-spinner/DelayedSpinner";


const DealBoxLoading: FC = () => {
    return (
        <Center py={'20px'}>
            <DelayedSpinner
                timeOutMs={500}
                height='50px'
            />
        </Center>
    )
}

export default DealBoxLoading;
