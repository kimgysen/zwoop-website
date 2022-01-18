
export enum ConnectTypeEnum {
    GENERAL_APP,
    PUBLIC_CHAT,
    PRIVATE_CHAT,
    POST_INBOX
}

export const stringFromConnectTypeEnum = (connectTypeEnum: ConnectTypeEnum): string =>
    ConnectTypeEnum[connectTypeEnum];
