import {
    Button,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter, Modal
} from "@chakra-ui/react";
import {FC} from "react";

interface IModal {
    title: string,
    isOpen: boolean,
    onClose: () => void
}

const ModalWidget: FC<IModal> = ({ title, children, isOpen, onClose }) => {
    return (
        <>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{ title }</ModalHeader>
                    <ModalCloseButton _focus={{boxShadow: "none"}} />
                    <ModalBody>
                        { children }
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalWidget;
