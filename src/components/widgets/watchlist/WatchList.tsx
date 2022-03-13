import {Box, Flex, Heading} from "@chakra-ui/react";
import {FC} from "react";
import ApiResult from "../../../api_clients/type/ApiResult";
import Tag from "@models/dto/domain-client-dto/tag/TagDto";
import WatchListLoading from "@components/widgets/watchlist/fallbackviews/WatchListLoading";
import WatchListError from "@components/widgets/watchlist/fallbackviews/WatchListError";
import WatchListEmpty from "@components/widgets/watchlist/fallbackviews/WatchListEmpty";
import {isWatchListEmpty, sortTags} from "@components/widgets/watchlist/WatchListHelper";
import WatchListItem from "@components/widgets/watchlist/WatchListItem";


interface TagsListProps {
    tagsRes: ApiResult<Tag[]>
}

const WatchList: FC<TagsListProps> = ({ tagsRes }) => {

    const tagsList: Tag[] = tagsRes.success
        ? sortTags(tagsRes.success as Tag[])
        : [];

    return (
        <Box>
            <Heading
                as='h2'
                size='sm'
                py='10px'
            >
                Watchlist
            </Heading>
            <Flex
                direction="column"
                flexWrap="wrap"
            >
                {
                    tagsRes.loading
                    && <WatchListLoading />
                }
                {
                    tagsRes.error
                    && <WatchListError errorMsg={ tagsRes.error } />
                }
                {
                    tagsRes.success
                    && isWatchListEmpty(tagsRes.success)
                    && <WatchListEmpty />
                }
                {
                    tagsRes.success
                    && !isWatchListEmpty(tagsRes.success)
                    && tagsList.map((tag) =>
                        <WatchListItem
                            key={`tag-${ tag.tagId }`}
                            tag={tag}/>)
                }
            </Flex>
        </Box>
    );
}

export default WatchList;
