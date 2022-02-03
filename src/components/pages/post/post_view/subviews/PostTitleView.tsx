import React, {FC} from "react";
import {Box, Heading} from "@chakra-ui/react";
import TimeAgo from "react-timeago";


interface PostTitleViewProps {
    title: string,
    createdAt: Date
}

const PostTitleView: FC<PostTitleViewProps> = ({ title, createdAt }) => {
    return (
        <Box>
            <Heading as='h2'
                     size='md'
                     pb='10px'
            >
                { title }
            </Heading>
            <Box
                fontSize='sm'
                color='gray.500'
            >
                <TimeAgo date={ createdAt } />
            </Box>
        </Box>
    )
}

export default PostTitleView;
