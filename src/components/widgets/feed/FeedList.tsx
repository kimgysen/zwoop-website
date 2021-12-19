import FeedItem from "./feed-item/FeedItem";
import {FC} from "react";
import {Box, Skeleton, Stack} from "@chakra-ui/react";
import Post from "@models/Post";
import Card from "@components/layout/components/card/Card";

interface FeedListProps {
    isLoading: boolean,
    posts: Post[] | undefined
}

const FeedList: FC<FeedListProps> = ({ isLoading, posts = [] }) => {
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
                posts.map(post => <FeedItem
                    key={ post.postId }
                    post={ post }
                />)
            }
        </Box>
    )
}

export default FeedList;
