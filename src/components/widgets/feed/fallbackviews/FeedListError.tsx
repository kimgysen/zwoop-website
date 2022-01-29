import {FC} from "react";
import {Box} from "@chakra-ui/react";

interface FeedListErrorProps {
    errorMsg: string
}

const FeedListError: FC<FeedListErrorProps> = ({ errorMsg }) => {
    return (
        <Box>
            { errorMsg }
        </Box>
    )
}

export default FeedListError;
