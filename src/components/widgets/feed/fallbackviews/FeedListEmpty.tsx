import {FC} from "react";
import {Box} from "@chakra-ui/react";

const FeedListEmpty: FC = () => {
    return (
        <Box mt='20px' plr='10px'>
            <i>There are currently no open questions</i>
        </Box>
    )
}

export default FeedListEmpty;
