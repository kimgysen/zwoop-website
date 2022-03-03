import {FC} from "preact/compat";
import {Flex, Link, useDisclosure} from "@chakra-ui/react";
import React from "react";
import Answer from "@models/db/entity/Answer";
import DeleteAnswerModalHoc
    from "@components/pages/post/post-status/post-answer/view/subviews/consultant-menu/DeleteAnswerModalHoc";

interface AnswerViewOwnerMenuProps {
    answer: Answer,
    activateEditView: () => void
}


export const AnswerViewConsultantMenu:FC<AnswerViewOwnerMenuProps> = ({ activateEditView, answer }) => {
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
                answer={ answer }
                isOpen={ isDelModalOpen }
                onClose={ onDelModalClose }
            />
        </>
    )
}

export default AnswerViewConsultantMenu;
