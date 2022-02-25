import React, {FC} from "react";
import {Box, Flex, Heading, Spacer} from "@chakra-ui/react";
import ApiResult from "../../../../api_clients/type/ApiResult";
import Card from "@components/layout/components/card/Card";
import {IsWatchingTag} from "@models/dto/user/IsWatchingTag";
import ButtonIsWatchingLoading from "@components/pages/tag/header/fallbackviews/ButtonIsWatchingLoading";
import ButtonIsWatchingError from "@components/pages/tag/header/fallbackviews/ButtonIsWatchingError";
import ButtonIsWatching from "@components/pages/tag/header/ButtonIsWatching";


interface TagHeaderProps {
    tagName: string,
    isWatchingRes: ApiResult<IsWatchingTag>,
    handleWatch: (tagName: string) => void,
    handleUnwatch: (tagName: string) => void
}

const TagHeader: FC<TagHeaderProps> = (
    { tagName, isWatchingRes, handleWatch, handleUnwatch }) => {

    return (
        <Card>
            <Flex>
                <Heading
                    as="h2"
                    size="md"
                    maxHeight={ "2.8rem" }
                    sx={{ overflow: 'hidden' }}
                    pb='10px'
                >
                    { tagName }
                </Heading>
                <Spacer />
                <Box>
                    {
                        isWatchingRes.error
                        && <ButtonIsWatchingError />

                    }
                    {
                        isWatchingRes.loading
                        && <ButtonIsWatchingLoading />
                    }
                    {
                        isWatchingRes.success
                        && <ButtonIsWatching
                                tagName={ tagName }
                                isWatching={ isWatchingRes.success.isWatching }
                                handleWatch={ handleWatch }
                                handleUnwatch={ handleUnwatch }
                            />
                    }
                </Box>
            </Flex>
        </Card>
    )
}

export default TagHeader;
