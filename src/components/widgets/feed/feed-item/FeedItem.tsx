import NextLink from 'next/link'
import marked from 'marked';
import {Box, Divider, Flex, Heading, HStack, Image, Link} from "@chakra-ui/react";
import React, {FC} from "react";
import Card from "../../../layout/components/card/Card";
import Post from "@models/Post";
import {BnbBox} from "./BnbBox";
import TagsList from "../../tags/TagsList";
import TimeAgo from "react-timeago";

export interface FeedItemProps {
    post: Post
}

//TODO: Use sanitizer library
//https://marked.js.org/using_advanced#options

const FeedItem: FC<FeedItemProps> = ({ post }) => {
    return (
        <Card>
            <Flex
                direction={ 'row' }
                minH={{ base: '50px' }}
            >
                <BnbBox price={ post.offerPrice } />
                <Box
                    flex="1"
                    ml={ "10px" }
                >
                    <Heading
                        as="h2"
                        size="sm"
                        mt={ -1 }
                        pb={'10px'}
                        maxHeight={ "2.8em" }
                        lineHeight={ "1.4em" }
                        sx={{ overflow: 'hidden' }}
                    >
                        <NextLink href={ `/post/${post.postId}` } passHref>
                            <Link
                                _hover={{ textDecoration: "underline" }}
                                isExternal
                                d="block"
                            >
                                { post.postTitle }
                            </Link>
                        </NextLink>
                    </Heading>
                    <Box fontSize='xs'>
                        <TimeAgo date={ post.createdAt } />
                    </Box>
                    <Box
                        fontSize="90%"
                        mt="5px"
                        color="gray.600"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: marked(post.postText) }}
                            style={{
                                maxHeight: '75px',
                                WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)",
                                maskImage: "linear-gradient(180deg, #000 60%, transparent)"
                            }}
                        />
                    </Box>
                    <Box
                        mt={ '10px' }
                    >
                        <TagsList tags={ post.tags } />
                    </Box>
                    <Divider />
                    <Flex flex={1}
                          justifyContent={ 'flex-end' }
                          pt='10px' pb='10px'
                          fontSize='sm'
                    >
                        <NextLink href={`/user/${ post.asker.userId }`} passHref>
                            <Link>
                                <HStack>
                                    <Image
                                        w='35px'
                                        h='35px'
                                        mr='10px'
                                        src={ post.asker.profilePic }
                                        alt='profile pic'
                                    />
                                    <Box>{ post.asker.nickName }</Box>
                                </HStack>
                            </Link>
                        </NextLink>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}

export default FeedItem;
