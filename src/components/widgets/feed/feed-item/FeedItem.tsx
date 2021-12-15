import NextLink from 'next/link'
import marked from 'marked';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import {FC} from "react";
import Card from "../../../layout/components/card/Card";
import Post from "../../../../model/Post";
import {TrxBox} from "./TrxBox";
import TagsList from "../../tags/TagsList";

export interface IFeedItem {
    post: Post
}

const FeedItem: FC<IFeedItem> = ({ post }) => {
    return (
        <Card>
            <Flex
                direction={ 'row' }
                minH={{ base: '50px' }}
            >
                <TrxBox price={ post.bidPrice } />
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
                        <NextLink href={ 'google.be' }>
                            <Link
                                _hover={{ textDecoration: "underline" }}
                                isExternal
                                d="block"
                            >
                                { post.postTitle } is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Link>
                        </NextLink>
                    </Heading>
                    <Box
                        fontSize="90%"
                        mt="5px"
                        color="gray.600"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: marked(post.postText, { sanitize: true }) }}
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
