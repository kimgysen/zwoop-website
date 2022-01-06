import Post from "@models/Post";
import Card from "@components/layout/components/card/Card";
import {Box, Divider, Flex, Heading, HStack, Image, Link} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import React from "react";
import TimeAgo from 'react-timeago';
import TagsList from "@components/widgets/tags/TagsList";
import NextLink from "next/link";


interface PostViewProps {
    post: Post
}

const PostView: React.FC<PostViewProps> = ({ post }) => {
    return (
        <Card>
            <Heading as='h2'
                     size='md'
                     pb='10px'>{ post.postTitle }</Heading>
            <Box fontSize='sm'>
                <TimeAgo date={ post.createdAt } />
            </Box>
            <Divider />
            <Box pt='10px' pb='10px' overflowX='scroll'>
                <Box className='markdown-body'>
                    <ReactMarkdown remarkPlugins={ [remarkGfm] }>{ post.postText }</ReactMarkdown>
                </Box>
            </Box>
            <Box pt='10px' pb='10px'>
                <TagsList tags={post.tags} />
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
                            <Box>{ post.asker.nickName || post.asker.userId }</Box>
                        </HStack>
                    </Link>
                </NextLink>
            </Flex>
        </Card>
    )
}

export default PostView;