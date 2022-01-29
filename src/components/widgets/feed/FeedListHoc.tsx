import {FC, useEffect, useState} from "react";
import {FeedTypeEnum, getFeed} from "../../../api_clients/feature/post/PostService";
import Post, {PostStatusEnum} from "@models/post/Post";
import ApiResult from "../../../api_clients/type/ApiResult";
import FeedList from "@components/widgets/feed/FeedList";

interface FeedListHocProps {
    feedType: FeedTypeEnum,
    postStatus: PostStatusEnum,
    page: number,
    pageSize: number,
    userId?: string,
    tagName?: string
}

const FeedListHoc: FC<FeedListHocProps> = (
    { feedType, postStatus, page, pageSize, userId, tagName }) => {

    const [feedRes, setFeedRes] = useState<ApiResult<Post[]>>({ loading: true, success: [], error: null });

    useEffect(() => {
        (async () => {
            const res = await getFeed(
                feedType,
                postStatus,
                page,
                pageSize,
                tagName
            );
            setFeedRes(res);
        })();
    }, [tagName]);

    return (
        <FeedList
            feedListRes={ feedRes }
        />
    )
}

export default FeedListHoc;
