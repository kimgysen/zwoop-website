import FeedItem from "./feed-item/FeedItem";
import {FC} from "react";
import {Box} from "@chakra-ui/react";
import ApiResult from "../../../api_clients/type/ApiResult";
import {isEmptyFeed} from "@components/widgets/feed/FeedListHelper";
import FeedListEmpty from "@components/widgets/feed/fallbackviews/FeedListEmpty";
import FeedListError from "@components/widgets/feed/fallbackviews/FeedListError";
import FeedListLoading from "@components/widgets/feed/fallbackviews/FeedListLoading";
import PostDto from "@models/dto/rest/receive/post/PostDto";

interface FeedListProps {
    feedListRes: ApiResult<PostDto[]>
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
                && feedList.map(postDto =>
                    <FeedItem
                        key={ postDto?.postId }
                        postDto={ postDto }
                />)
            }
        </Box>
    )
}

export default FeedList;
