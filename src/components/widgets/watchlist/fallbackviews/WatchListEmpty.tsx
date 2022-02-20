import {FC} from "react";
import {Box} from "@chakra-ui/layout/src/box";


const WatchListEmpty: FC = () => {
    return (
        <Box py='10px'>
            <i>Watchlist is empty</i>
        </Box>
    )
}

export default WatchListEmpty;
