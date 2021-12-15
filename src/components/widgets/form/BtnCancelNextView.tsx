import React, {FC} from "react";

import {Flex, Spacer} from "@chakra-ui/react";
import PrevButton from "./buttons/PrevButton";
import NextButton from "./buttons/NextButton";
import CancelButton from "./buttons/CancelButton";


interface ICancelNextView {
    nextHref: string,
    hasPrevious?: boolean,
    prevHref?: string,
    showCancelButton?: boolean,
    onCancel: (e: React.MouseEvent) => void,
}

const BtnCancelNextView: FC<ICancelNextView> = ({ nextHref, prevHref, hasPrevious, onCancel, showCancelButton }) => {
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
            <NextButton href={ nextHref } />
        </Flex>
    );
};

export default BtnCancelNextView;
