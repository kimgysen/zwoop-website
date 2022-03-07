import {FC, useEffect, useState} from "react";
import {FeedTypeEnum, getFeed} from "@api_clients/feature/post/PostApiClient";
import ApiResult from "../../../api_clients/type/ApiResult";
import FeedList from "@components/widgets/feed/FeedList";
import {PostStatusEnum} from "@models/db/entity/PostStatus";
import PostDto from "@models/dto/rest/receive/post/PostDto";

interface FeedListHocProps {
    feedType: FeedTypeEnum,
    postStatus: PostStatusEnum,
    page: number,
    pageSize: number,
    tagName?: string
}

const FeedListHoc: FC<FeedListHocProps> = (
    { feedType, postStatus, page, pageSize, tagName }) => {

    const [feedRes, setFeedRes] = useState<ApiResult<PostDto[]>>({ loading: true, success: [], error: null });

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
