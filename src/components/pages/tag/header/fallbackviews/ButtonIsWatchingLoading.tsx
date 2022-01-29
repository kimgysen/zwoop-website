import React, {FC} from "react";
import {Button} from "@chakra-ui/react";


const ButtonIsWatchingLoading: FC = () => {
    return (
        <Button
            isLoading
            loadingText='Loading'
            colorScheme='teal'
            variant='outline'
        />
    )
}

export default ButtonIsWatchingLoading;
