
export enum StreamTypeEnum {
    GENERAL_APP,
    TAG_PUBLIC_CHAT,
    POST_PRIVATE_CHAT,
    POST_INBOX
}

export const stringFromConnectTypeEnum = (connectTypeEnum: StreamTypeEnum): string =>
    StreamTypeEnum[connectTypeEnum];
