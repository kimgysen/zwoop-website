import NextLink from 'next/link'
import {Box, Divider, Flex, Heading, HStack, Image, Link} from "@chakra-ui/react";
import React, {FC} from "react";
import Card from "../../../layout/components/card/Card";
import {BnbBox} from "./BnbBox";
import TagsList from "../../tags/TagsList";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PostDto from "@models/dto/rest/receive/post/PostDto";

export interface FeedItemProps {
    postDto: PostDto
}

//TODO: Use sanitizer library
//https://marked.js.org/using_advanced#options

const FeedItem: FC<FeedItemProps> = ({ postDto }) => {
    return (
        <Card>
            <Flex
                minH={{ base: '50px' }}
            >
                <BnbBox price={ postDto?.bidPrice } />
                <Box
                    ml={ "20px" }
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
                        <NextLink href={ `/post/${postDto?.postId}` } passHref>
                            <Link
                                _hover={{ textDecoration: "underline" }}
                                isExternal
                                d="block"
                            >
                                { postDto?.postTitle }
                            </Link>
                        </NextLink>
                    </Heading>
                    <Box fontSize='xs'>
                        <TimeAgo date={ postDto?.createdAt } />
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
                                overflow: 'auto',
                                maxWidth: '500px',
                                WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)",
                                maskImage: "linear-gradient(180deg, #000 60%, transparent)"
                            }}
                        >
                            <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ postDto?.postText }</ReactMarkdown>
                        </div>
                    </Box>
                    <Box
                        mt={ '10px' }
                    >
                        <TagsList tags={ postDto?.tagList } />
                    </Box>
                    <Divider />
                    <Flex flex={1}
                          justifyContent={ 'flex-end' }
                          pt='10px' pb='10px'
                          fontSize='sm'
                    >
                        <NextLink href={`/user/${ postDto?.op?.userId }`} passHref>
                            <Link>
                                <HStack>
                                    <Image
                                        w='35px'
                                        h='35px'
                                        mr='10px'
                                        src={ postDto?.op?.avatar }
                                        alt='profile pic'
                                    />
                                    <Box>{ postDto?.op?.nickName }</Box>
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
