import {FC} from "react";
import {Box, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import Tag from "@models/tag/Tag";


interface WatchListItemProps {
    tag: Tag
}

const WatchListItem: FC<WatchListItemProps> = ({ tag }) => {
    return (
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
    )
};

export default WatchListItem;
