import React from "react";
import TronLinkAuth from "../../../../../model/TronlinkAuth";
import {Box} from "@chakra-ui/layout/src/box";

interface TronLoginPopupProps {
    tronLinkAuth: TronLinkAuth
}


const TronMessagePopup: React.FC<TronLoginPopupProps> = ({ tronLinkAuth: { isTrxWalletInstalled, isTrxWalletLoggedIn }}) => {
    return (
        <>
            {
                !isTrxWalletInstalled &&
                    <Box>The app requires Tronlink. Plase install Tronlink first</Box>
            }
            {
                isTrxWalletInstalled && !isTrxWalletLoggedIn &&
                    <Box>Tronlink is installed but you are not logged in. Please log in first.</Box>
            }
        </>
    )
};

export default TronMessagePopup;
