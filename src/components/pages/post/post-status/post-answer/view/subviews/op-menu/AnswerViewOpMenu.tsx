import {FC} from "preact/compat";
import {Button, Flex, useDisclosure} from "@chakra-ui/react";
import React from "react";
import Answer from "@models/db/entity/Answer";
import AcceptAnswerModalHoc
    from "@components/pages/post/post-status/post-answer/view/subviews/op-menu/AcceptAnswerModalHoc";
import {FaCheck} from "react-icons/fa";

interface AnswerViewOpMenuProps {
    answer: Answer
}


export const AnswerViewOpMenu:FC<AnswerViewOpMenuProps> = ({ answer }) => {
    const { isOpen: isAcceptModalOpen, onOpen: onAcceptModalOpen, onClose: onAcceptModalClose } = useDisclosure();

    return (
        <>
            <Flex color='gray.600'>
                <Button
                    colorScheme='green'
                    leftIcon={<FaCheck />}
                    onClick={ onAcceptModalOpen }
                >
                    Accept answer
                </Button>
            </Flex>
            <AcceptAnswerModalHoc
                answer={ answer }
                isOpen={ isAcceptModalOpen }
                onClose={ onAcceptModalClose }
            />
        </>
    )
}

export default AnswerViewOpMenu;
