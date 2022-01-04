import {Box, Flex, Link} from "@chakra-ui/react";
import {FC} from "react";
import Tag from "@models/Tag";
import NextLink from 'next/link';


interface TagsListProps {
    tags: Tag[]
}

const TagsList: FC<TagsListProps> = ({ tags }) => (
    <Flex
        direction="row"
        flexWrap="wrap"
    >
        { tags.map((tag, index) => (
            <NextLink
                key={`tag-${ tag }-${ index }`}
                href={`/tags/${ tag.tagName }`} passHref>
                <Link>
                    <Box className='tag'
                         fontSize={ '80%' }
                         color="#03254c;"
                         bgColor="#d0efff"
                         borderRadius={ '4px' }
                         mr={ '4px' }
                         mb={ '5px' }
                         p="3px 8px 3px"
                    >
                        { tag.tagName }
                    </Box>
                </Link>
            </NextLink>
        ))}
    </Flex>
);

export default TagsList;
