import React, {FC, useEffect, useState} from "react";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import ApiResult from "@apiclients/type/ApiResult";
import Tag from "@models/Tag";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Card from "@components/layout/components/card/Card";


interface TagHeaderProps {
    tagName: string
    followedTagsResult: ApiResult
}

const TagHeader: FC<TagHeaderProps> = ({ tagName, followedTagsResult }) => {

    const [userFollowsTag, setUserFollowsTag] = useState<Boolean>(false);

    useEffect(() => {
        if (followedTagsResult.result) {
            const found = (followedTagsResult.result as Tag[])
                .find(tag => tag.tagName === tagName);
            setUserFollowsTag(!!found);
        }
    }, [followedTagsResult]);

    const handleWatch = () => {
        console.log('watch or unwatch');
    }

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
                        followedTagsResult.error &&
                        <Box>Watch button could not be loaded</Box>
                    }
                    {
                        followedTagsResult.loading
                        && (
                            <Button
                                isLoading
                                loadingText='Loading'
                                colorScheme='teal'
                                variant='outline'
                            />
                        )
                    }
                    {
                        followedTagsResult.result
                        && userFollowsTag
                        && (
                            <Button
                                leftIcon={<FaEyeSlash />}
                                colorScheme='teal'
                                variant='solid'
                            >
                                Unwatch
                            </Button>
                        )
                    }
                    {
                        followedTagsResult.result
                        && !userFollowsTag
                        && (
                            <Button
                                leftIcon={<FaEye />}
                                colorScheme='teal'
                                variant='solid'
                            >
                                Watch
                            </Button>
                        )
                    }
                </Box>
            </Flex>
        </Card>
    )
}

export default TagHeader;
