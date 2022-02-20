import {FC} from "react";
import {Flex} from "@chakra-ui/layout/src/flex";

const FeedListEmpty: FC = () => {
    return (
        <Flex
            w='100%'
            mt='20px'
            py='10px'
            direction='column'
        >
            No open question currently
        </Flex>
    )
}

export default FeedListEmpty;
