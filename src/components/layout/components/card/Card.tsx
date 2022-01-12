import {Box} from "@chakra-ui/react";
import {FC} from "react";

interface CardProps {
    p?: number
}

const Card: FC<CardProps> = ({ children, p }) => (
    <Box
        sx={{ width: '100%'}}
        bg='white'
        rounded='md'
        p={ p || 5 }
        mb={3}
    >
            { children }
    </Box>
);

export default Card;
