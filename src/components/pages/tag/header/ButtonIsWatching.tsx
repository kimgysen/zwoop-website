import React, {FC} from "react";
import {Button} from "@chakra-ui/react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import ApiResult from "@api_clients/type/ApiResult";
import {IsWatchingTag} from "@models/dto/user/IsWatchingTag";
import {Box} from "@chakra-ui/layout/src/box";
import ButtonIsWatchingError from "@components/pages/tag/header/fallbackviews/ButtonIsWatchingError";
import ButtonIsWatchingLoading from "@components/pages/tag/header/fallbackviews/ButtonIsWatchingLoading";


interface ButtonIsWatchingProps {
    tagName: string,
    isWatchingRes: ApiResult<IsWatchingTag>,
    handleWatch: (tagName: string) => void,
    handleUnwatch: (tagName: string) => void
}

const ButtonIsWatching: FC<ButtonIsWatchingProps> = ({ tagName, isWatchingRes, handleWatch, handleUnwatch }) => {
    const isWatching = isWatchingRes?.success?.isWatching;

    return (
        <Box>
            {
                isWatchingRes?.error
                && <ButtonIsWatchingError />

            }
            {
                isWatchingRes?.loading
                && <ButtonIsWatchingLoading />
            }
            {
                isWatchingRes?.success
                && (
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
            </Box>
    )
}

export default ButtonIsWatching;
