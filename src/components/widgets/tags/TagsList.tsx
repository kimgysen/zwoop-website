import {Box, Flex} from "@chakra-ui/react";
import {FC} from "react";
import Tag from "../../../model/Tag";


interface ITagsList {
    tags: Tag[]
}

const TagsList: FC<ITagsList> = ({ tags }) => (
    <Flex
        direction="row"
        flexWrap="wrap"
    >
        { tags.map((tag, index) => (
            <Box className='tag'
                 key={`tag-${ tag }-${ index }`}
                 fontSize={ '80%' }
                 color="#03254c;"
                 bgColor="#d0efff"
                 borderRadius={ '4px' }
                 mr={ '4px' }
                 mb={ '5px' }
                 p="3px 8px 3px"
            >
                { tag }
            </Box>
        ))}
    </Flex>
);

export default TagsList;
