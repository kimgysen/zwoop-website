import FeedItem from "./feed-item/FeedItem";
import {FC} from "react";
import {Box, Skeleton, Stack} from "@chakra-ui/react";
import Post from "@models/Post";
import Card from "@components/layout/components/card/Card";

interface FeedListProps {
    isLoading: boolean,
    posts: Post[] | undefined,
    error?: string
}

const FeedList: FC<FeedListProps> = ({ isLoading, posts = [], error }) => {
    return (
        <Box width={'100%'}>
            {
                isLoading &&
                    <Card>
                        <Stack>
                            <Skeleton height="20px" />
                            <Skeleton height="15px" />
                            <Skeleton height="15px" />
                        </Stack>
                    </Card>
            }
            {
                error && (
                    <Box>
                        { error }
                    </Box>
                )
            }
            {
                (!posts || posts.length === 0) &&
                    <Box mt='20px' plr='10px'>
                        <i>There are currently no open questions</i>
                    </Box>
            }
            {
                posts && posts.map(post => <FeedItem
                    key={ post.postId }
                    post={ post }
                />)
            }
        </Box>
    )
}

export default FeedList;
