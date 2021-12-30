
const TronWeb = require('tronweb');


const TRONGRID_API = 'https://api.trongrid.io';
const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

export const isInstalled = () => !!(window as any).tronWeb;

export const isReady = () => (window as any).tronWeb.ready;

export const isLoggedIn = () => isInstalled() && isReady();

export const getAccountName = () => (window as any).tronWeb.defaultAddress.name;

export const getPublicAddress = () => (window as any).tronWeb.defaultAddress.base58;

export const createGlobalTronWebInstance = () => {
    (window as any).tronWeb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);
    // Set default address (foundation address) used for contract calls
    // Directly overwrites the address object as TronLink disabled the
    // function call
    (window as any).tronWeb.defaultAddress = {
        hex: (window as any).tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
    };
}

export const retryLogin = () => new Promise((resolve, reject) => {
    const maxRetries = 3;
    let tries = 0;

    const timer = setInterval(() => {
        if (tries >= maxRetries) {
            clearInterval(timer);
            if (!isInstalled() || !isLoggedIn()) {
                resolve({
                    isTrxWalletInstalled: isInstalled(),
                    isTrxWalletLoggedIn: isLoggedIn()
                });

            } else {
                createGlobalTronWebInstance();
            }
        }

        if (isInstalled() && isLoggedIn()) {
            clearInterval(timer);
            resolve({
                isTrxWalletInstalled: isInstalled(),
                isTrxWalletLoggedIn: isLoggedIn(),
                publicAddressTrx: getPublicAddress()
            });
        } else {
            return tries++;
        }
    }, 100);

});

export const toHexString = (str: string) => (window as any)
    .tronWeb
    .toHex(str);

export const signNonce = (hexNonce: string) => {
    return (window as any).tronWeb.trx.sign(hexNonce);
}
