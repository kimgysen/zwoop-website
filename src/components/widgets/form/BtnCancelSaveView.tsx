import React, {FC} from "react";

import {Flex, Spacer} from "@chakra-ui/react";
import CancelButton from "./buttons/CancelButton";
import SaveButton from "./buttons/SaveButton";


interface BtnSaveViewProps {
    onCancel: (e: React.MouseEvent) => void
    onSave: (e: React.MouseEvent) => void,
    shouldDisableSave: boolean
}


const BtnCancelSaveView: FC<BtnSaveViewProps> = ({ onCancel, onSave, shouldDisableSave }) => {
    return (
        <Flex mt={5} pb={10}>
            <Spacer />
            <CancelButton onCancel={ onCancel } />
            <SaveButton
                label='Save'
                onSave={ onSave }
                shouldDisableSave={ shouldDisableSave }
            />
        </Flex>
    );
};

export default BtnCancelSaveView;
