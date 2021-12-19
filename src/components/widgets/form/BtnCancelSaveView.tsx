import React, {FC} from "react";

import {Flex, Spacer} from "@chakra-ui/react";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";


interface BtnSaveViewProps {
    onCancel: (e: React.MouseEvent) => void
    onSave: (e: React.MouseEvent) => void
}


const BtnCancelSaveView: FC<BtnSaveViewProps> = ({ onCancel, onSave }) => {
    return (
        <Flex mt={5} pb={10}>
            <Spacer />
            <CancelButton onCancel={ onCancel } />
            <SaveButton onSave={ onSave } />
        </Flex>
    );
};

export default BtnCancelSaveView;
