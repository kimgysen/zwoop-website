import NextLink from 'next/link'
import marked from 'marked';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import {FC} from "react";
import Card from "../../../layout/components/card/Card";
import Post from "@models/Post";
import {TrxBox} from "./TrxBox";
import TagsList from "../../tags/TagsList";

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
                <TrxBox price={ post.offer } />
                <Box
                    flex="1"
                    ml={ "10px" }
                >
                    <Heading
                        as="h2"
                        size="sm"
                        mt={ -1 }
                        maxHeight={ "2.8em" }
                        lineHeight={ "1.4em" }
                        sx={{ overflow: 'hidden' }}
                    >
                        <NextLink href={ '/post/1' } passHref>
                            <Link
                                _hover={{ textDecoration: "underline" }}
                                isExternal
                                d="block"
                            >
                                { post.title }
                            </Link>
                        </NextLink>
                    </Heading>
                    <Box
                        fontSize="90%"
                        mt="5px"
                        color="gray.600"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: marked(post.descriptionMd) }}
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
                </Box>
            </Flex>
        </Card>
    )
}

export default FeedItem;
