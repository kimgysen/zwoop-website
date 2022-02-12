import {Box} from "@chakra-ui/react";
import {FC} from "react";

interface CardProps {
    p?: string,
    color?: string
}

const Card: FC<CardProps> = ({ children, p, color }) => (
    <Box
        sx={{ width: '100%'}}
        bg={ color || 'white' }
        rounded='md'
        p={ p || 5 }
        mb={3}
    >
            { children }
    </Box>
);

export default Card;
