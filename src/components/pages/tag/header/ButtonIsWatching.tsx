import React, {FC} from "react";
import {Button} from "@chakra-ui/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";


interface ButtonIsWatchingProps {
    tagName: string,
    isWatching: boolean,
    handleWatch: (tagName: string) => void,
    handleUnwatch: (tagName: string) => void
}

const ButtonIsWatching: FC<ButtonIsWatchingProps> = ({ tagName, isWatching, handleWatch, handleUnwatch }) => {
    return (
        <Button
            leftIcon={
                isWatching
                    ? <FaEyeSlash />
                    : <FaEye />
            }
            colorScheme='teal'
            variant='solid'
            onClick={
                isWatching
                    ? () => handleUnwatch(tagName)
                    : () => handleWatch(tagName)
            }
        >
            {
                isWatching
                    ? 'unwatch'
                    : 'watch'
            }
        </Button>
    )
}

export default ButtonIsWatching;
