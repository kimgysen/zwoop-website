import FeedItem from "./feed-item/FeedItem";
import {FC} from "react";
import {Box, Skeleton, Stack} from "@chakra-ui/react";
import Post from "../../../model/Post";
import Card from "../../layout/components/card/Card";

interface IFeedList {
    isLoading: boolean,
    posts: Post[] | undefined
}

const FeedList: FC<IFeedList> = ({ isLoading, posts = [] }) => {
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
