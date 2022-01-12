
export enum ConnectTypeEnum {
    GENERAL_APP,
    PUBLIC_CHAT,
    PRIVATE_CHAT,
    GENERAL_INBOX,
    NOTIFICATIONS,
    POST_INBOX
}

export const stringFromConnectTypeEnum = (connectTypeEnum: ConnectTypeEnum): string =>
    ConnectTypeEnum[connectTypeEnum];
