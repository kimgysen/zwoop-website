import NextLink from 'next/link'
import {Box, Divider, Flex, Heading, HStack, Image, Link} from "@chakra-ui/react";
import React, {FC} from "react";
import Card from "../../../layout/components/card/Card";
import Post from "@models/post/Post";
import {BnbBox} from "./BnbBox";
import TagsList from "../../tags/TagsList";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface FeedItemProps {
    post: Post
}

//TODO: Use sanitizer library
//https://marked.js.org/using_advanced#options

const FeedItem: FC<FeedItemProps> = ({ post }) => {
    return (
        <Card>
            <HStack
                minH={{ base: '50px' }}
                align={'top'}
            >
                <BnbBox price={ post.offerPrice } />
                <Box
                    ml={ "10px" }
                    width={'80%'}
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
                        className='markdown-body'
                        fontSize="90%"
                        mt="5px"
                        color="gray.600"
                    >
                        <div
                            style={{
                                maxHeight: '75px',
                                WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)",
                                maskImage: "linear-gradient(180deg, #000 60%, transparent)"
                            }}
                        >
                            <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ post.postText }</ReactMarkdown>
                        </div>
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
            </HStack>
        </Card>
    )
}

export default FeedItem;
