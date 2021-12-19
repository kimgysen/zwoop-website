import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import {FC} from "react";
import Tag from "@models/Tag";
import NextLink from "next/link";


interface TagsListProps {
    tags: Tag[]
}

const WatchList: FC<TagsListProps> = ({ tags }) => (
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
            { tags.map((tag, index) => (
                <Box className='tag'
                     key={`tag-${ tag }-${ index }`}
                     fontSize='sm'
                     p="10px 5px"
                >
                    <NextLink href={ `/tags/${ tag.tagName }` } passHref>
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

export default WatchList;
