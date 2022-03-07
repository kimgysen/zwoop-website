import {FC} from "preact/compat";
import {Button, Flex, useDisclosure} from "@chakra-ui/react";
import React from "react";
import AcceptAnswerModalHoc
    from "@components/pages/post/post-status/post-answer/view/subviews/op-menu/AcceptAnswerModalHoc";
import {FaCheck} from "react-icons/fa";
import AnswerDto from "@models/dto/rest/receive/answer/AnswerDto";

interface AnswerViewOpMenuProps {
    answerDto: AnswerDto
}


export const AnswerViewOpMenu:FC<AnswerViewOpMenuProps> = ({ answerDto }) => {
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
                answerDto={ answerDto }
                isOpen={ isAcceptModalOpen }
                onClose={ onAcceptModalClose }
            />
        </>
    )
}

export default AnswerViewOpMenu;
