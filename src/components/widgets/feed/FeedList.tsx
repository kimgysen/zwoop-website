import FeedItem from "./feed-item/FeedItem";
import {FC} from "react";
import {Box} from "@chakra-ui/react";
import Post from "@models/db/entity/Post";
import ApiResult from "../../../api_clients/type/ApiResult";
import {isEmptyFeed} from "@components/widgets/feed/FeedListHelper";
import FeedListEmpty from "@components/widgets/feed/fallbackviews/FeedListEmpty";
import FeedListError from "@components/widgets/feed/fallbackviews/FeedListError";
import FeedListLoading from "@components/widgets/feed/fallbackviews/FeedListLoading";

interface FeedListProps {
    feedListRes: ApiResult<Post[]>
}

const FeedList: FC<FeedListProps> = ({ feedListRes }) => {

    const feedList = feedListRes.success || [];

    return (
        <Box width={'100%'}>
            {
                feedListRes.loading
                && <FeedListLoading />
            }
            {
                feedListRes.error
                && (
                    <FeedListError
                        errorMsg={ feedListRes.error }
                    />
                )
            }
            {
                feedListRes.success
                && isEmptyFeed(feedList)
                && <FeedListEmpty />
            }
            {
                feedListRes.success
                && feedList.map(post =>
                    <FeedItem
                        key={ post?.postId }
                        post={ post }
                />)
            }
        </Box>
    )
}

export default FeedList;
