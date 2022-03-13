import {FC} from "preact/compat";
import {Flex, Link, useDisclosure} from "@chakra-ui/react";
import React from "react";
import DeleteAnswerModalHoc
    from "@components/pages/post/post-status/post-answer/view/subviews/consultant-menu/DeleteAnswerModalHoc";
import AnswerDto from "@models/dto/domain-client-dto/answer/AnswerDto";

interface AnswerViewOwnerMenuProps {
    answerDto: AnswerDto,
    activateEditView: () => void
}


export const AnswerViewConsultantMenu:FC<AnswerViewOwnerMenuProps> = ({ activateEditView, answerDto }) => {
    const { isOpen: isDelModalOpen, onOpen: onDelModalOpen, onClose: onDelModalClose } = useDisclosure();

    return (
        <>
            <Flex color='gray.600'>
                <Link
                    onClick={ activateEditView }
                    mr='10px'
                    _hover={{
                        textDecoration: 'underline'
                    }}>
                    Edit
                </Link>
                <Link
                    onClick={ onDelModalOpen }
                    _hover={{
                        textDecoration: 'underline'
                    }}>
                    Delete
                </Link>
            </Flex>
            <DeleteAnswerModalHoc
                answerDto={ answerDto }
                isOpen={ isDelModalOpen }
                onClose={ onDelModalClose }
            />
        </>
    )
}

export default AnswerViewConsultantMenu;
