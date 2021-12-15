import React, {FC} from "react";

import {Flex, Spacer} from "@chakra-ui/react";
import CancelButton from "./buttons/CancelButton";
import PrevButton from "./buttons/PrevButton";
import SaveButton from "./buttons/SaveButton";


interface IBtnSaveView {
    hasPrevious?: boolean,
    prevHref: string,
    showCancelButton: boolean,
    onCancel: (e: React.MouseEvent) => void
    onSave: (e: React.MouseEvent) => void
}


const BtnCancelSaveView: FC<IBtnSaveView> = ({
    hasPrevious, prevHref, showCancelButton = false, onCancel, onSave }) => {

    return (
        <Flex mt={5} pb={10}>
            <Spacer />
            {
                showCancelButton &&
                <CancelButton onCancel={ onCancel } />
            }
            {
                hasPrevious && prevHref &&
                <PrevButton href={ prevHref } />
            }
            <SaveButton onSave={ onSave } />
        </Flex>
    );

};

export default BtnCancelSaveView;
