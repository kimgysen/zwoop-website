import React, {FC} from "react";
import {Box, Flex, Heading, Spacer} from "@chakra-ui/react";
import ApiResult from "../../../../api_clients/type/ApiResult";
import Card from "@components/layout/components/card/Card";
import {IsWatchingTag} from "@models/dto/user/IsWatchingTag";
import ButtonIsWatching from "@components/pages/tag/header/ButtonIsWatching";
import AuthState from "@models/auth/AuthState";


interface TagHeaderProps {
    authState: AuthState,
    tagName: string,
    isWatchingRes: ApiResult<IsWatchingTag>,
    handleWatch: (tagName: string) => void,
    handleUnwatch: (tagName: string) => void
}

const TagHeader: FC<TagHeaderProps> = (
    { authState, tagName, isWatchingRes, handleWatch, handleUnwatch }) => {
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
                       authState?.isLoggedIn
                        && <ButtonIsWatching
                                tagName={ tagName }
                                isWatchingRes={ isWatchingRes }
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
