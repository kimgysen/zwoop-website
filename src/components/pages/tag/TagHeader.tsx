import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import ApiResult from "@apiclients/type/ApiResult";
import Tag from "@models/Tag";
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Card from "@components/layout/components/card/Card";
import {unwatchTag, watchTag} from "@apiclients/feature/tag/TagService";
import {getRawJwt} from "../../../service/jwt/JwtService";


interface TagHeaderProps {
    tagName: string,
    followedTagsRes: ApiResult,
    setFollowedTagsRes: Dispatch<SetStateAction<ApiResult>>
}

const TagHeader: FC<TagHeaderProps> = (
    { tagName, followedTagsRes, setFollowedTagsRes }) => {

    let defaultUserFollowsTag = { loading: false, success: null, error: null };
    const [userFollowsTagRes, setUserFollowsTagRes] = useState<ApiResult>(defaultUserFollowsTag);

    const findTagNameInTags = (tag: string, tags: Tag[]) => tags.find(tag => tag.tagName === tagName);

    useEffect(() => {
        if (tagName && followedTagsRes.success) {
            const found = !!findTagNameInTags(tagName, followedTagsRes.success as Tag[]);
            setUserFollowsTagRes({ ...defaultUserFollowsTag, success: { followsTag: found }});
        }
    }, [followedTagsRes, tagName]);

    const handleToggleWatch = async () => {
        setUserFollowsTagRes({ ...defaultUserFollowsTag, loading: true });
        const jwt = await getRawJwt();

        if (userFollowsTagRes.success.followsTag) {
            const resUnwatch = await unwatchTag(tagName, jwt);
            setUserFollowsTagRes({ ...resUnwatch, success: { followsTag: false } });
            const followedTags = followedTagsRes.success as Tag[];
            const tagToRemoveIndex = followedTags.findIndex((item) => item.tagName === tagName);

            if (tagToRemoveIndex !== -1) {
                followedTags.splice(tagToRemoveIndex, 1);
                setFollowedTagsRes({
                    ...followedTagsRes,
                    success: [...followedTags]
                });
            }

        } else {
            const resWatch = await watchTag(tagName, jwt);
            setUserFollowsTagRes({ ...resWatch, success: { followsTag: true } });
            const followedTags = followedTagsRes.success as Tag[];
            setFollowedTagsRes({
                ...followedTagsRes,
                success: [...followedTags, resWatch.success]
            });
        }
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
                        followedTagsRes.error &&
                        <Box>Watch button could not be loaded</Box>
                    }
                    {
                        followedTagsRes.loading || userFollowsTagRes.loading
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
                        userFollowsTagRes.success
                        && userFollowsTagRes.success.followsTag
                        && (
                            <Button
                                leftIcon={<FaEyeSlash />}
                                colorScheme='teal'
                                variant='solid'
                                onClick={ handleToggleWatch }
                            >
                                Unwatch
                            </Button>
                        )
                    }
                    {
                        userFollowsTagRes.success
                        && !(userFollowsTagRes.success.followsTag)
                        && (
                            <Button
                                leftIcon={<FaEye />}
                                colorScheme='teal'
                                variant='solid'
                                onClick={ handleToggleWatch }
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
