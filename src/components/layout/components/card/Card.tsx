import {Box} from "@chakra-ui/react";
import {FC} from "react";


const Card: FC = ({ children }) =>
        <Box
            sx={{ width: '100%'}}
            bg='white'
            rounded='md'
            p={ 5 }
            mb={3}
        >
            { children }
        </Box>

export default Card;
