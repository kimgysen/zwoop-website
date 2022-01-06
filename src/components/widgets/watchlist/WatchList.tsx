import {Box, Flex, Heading, Link, Spinner} from "@chakra-ui/react";
import {FC} from "react";
import NextLink from "next/link";
import ApiResult from "@apiclients/type/ApiResult";
import Tag from "@models/Tag";


interface TagsListProps {
    tagsRes: ApiResult
}

const WatchList: FC<TagsListProps> = ({ tagsRes }) => {
    if (tagsRes.success) {
        (tagsRes.success as Tag[])
            .sort((a, b) =>
                a.tagName.localeCompare(b.tagName));
    }

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
                    tagsRes.loading && <Spinner />
                }
                {
                    tagsRes.error && <Box>{ tagsRes.error }</Box>
                }
                {
                    tagsRes.success && (tagsRes.success as Tag[]).length === 0 && (
                        <Box>
                            <i>Search and watch tags</i>
                        </Box>
                    )
                }
                {
                    tagsRes.success && (tagsRes.success as Tag[]).length > 0 &&
                        (tagsRes.success as Tag[]).map((tag, index) => (

                        <Box className='tag'
                             key={`${ tag.tagId }`}
                             fontSize='sm'
                             p="10px 5px"
                        >
                            <NextLink href={ `/tags/${tag.tagName}` } passHref>
                                <Link
                                    _hover={{ textDecoration: "underline" }}
                                    d="block"
                                >
                                    { tag.tagName }
                                </Link>
                            </NextLink>
                        </Box>
                    ))}
            </Flex>
        </Box>
    );
}

export default WatchList;
