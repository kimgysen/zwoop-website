import React, {FC} from "react";
import {Center, Image, Text, VStack} from "@chakra-ui/react";

const FeedListEmpty: FC = () => {
    return (
        <Center>
            <VStack py='50px'>
                <Image
                    height='100px'
                    width='100px'
                    src={ '/static/images/feed_noresults.png' }
                    alt='Empty feed'
                />
                <Text fontWeight='bold'>
                    No open questions
                </Text>
            </VStack>
        </Center>
    )
}

export default FeedListEmpty;
