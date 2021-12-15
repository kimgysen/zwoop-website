import React from "react";
import TronLinkAuth from "../../../../model/TronlinkAuth";
import ModalWidget from "@components/widgets/modal/Modal";
import TronMessagePopup from "@components/layout/navbar/modal/content/TronMessagePopup";
import LoginModal from "@components/layout/navbar/modal/LoginModal";


interface AuthModalProps {
    modalIsOpen: boolean,
    modalOnOpen: () => void,
    modalOnClose: () => void,

    tronLinkAuth: TronLinkAuth,
}

const TronLinkModal: React.FC<AuthModalProps> = ({ modalIsOpen, modalOnOpen, modalOnClose, tronLinkAuth }) => {
    const title = getTitle(tronLinkAuth);

    return (
        <ModalWidget
            title={ title || '' }
            isOpen={ modalIsOpen }
            onClose={ modalOnClose }
        >
                { tronLinkAuth.publicAddressTrx }
        </ModalWidget>
    );
}

function getTitle(tronLinkAuth: TronLinkAuth) {
    let title;

    if (tronLinkAuth) {

        if (!tronLinkAuth.isTrxWalletInstalled) {
            title = 'Install Tronlink';

        } else if (!tronLinkAuth.isTrxWalletLoggedIn) {
            title = 'Log in to Tronlink';

        } else {
            title = 'Register or Log in';

        }

    }

    return title;
}

export default TronLinkModal;
