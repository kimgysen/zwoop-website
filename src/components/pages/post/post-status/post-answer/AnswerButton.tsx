import React, {FC} from "react";
import Post from "@models/db/entity/Post";
import {Button} from "@chakra-ui/react";
import {Flex} from "@chakra-ui/layout/src/flex";
import {FaPen} from "react-icons/fa";


interface AnswerButtonProps {
    post: Post
}

const AnswerButton: FC<AnswerButtonProps> = ({ post }) => {
    return (
        <Flex
            justifyContent='flex-end'
        >
            <Button
                bg={'blue.400'}
                leftIcon={ <FaPen /> }
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
            >
                Answer
            </Button>
        </Flex>
    )
}

export default AnswerButton;
