import {Dispatch, SetStateAction} from "react";
import InboxItemReceiveDto from "./receive/InboxItemReceiveDto";
import {connectStomp, disconnectStomp, initInbox} from "./StompService";
import {NextRouter} from "next/router";
import {HEADER_CONNECT_TYPE, HEADER_POST_ID} from "./types/StompHeader";
import {ConnectTypeEnum, stringFromConnectTypeEnum} from "./types/ConnectType";


interface ConnectInboxProps {
    postId: string,
    jwt: string,
    setInboxLoading: Dispatch<SetStateAction<boolean>>,
    setInboxItems: Dispatch<SetStateAction<InboxItemReceiveDto[]>>,
    router: NextRouter
}


export const connectInbox = ({ postId, jwt, setInboxLoading, setInboxItems, router }: ConnectInboxProps) => {
    connectStomp({
            [HEADER_CONNECT_TYPE]: stringFromConnectTypeEnum(ConnectTypeEnum.POST_INBOX),
            [HEADER_POST_ID]: postId
        }, jwt, (frame) => {
        console.log('connect inbox success', frame);
        initInbox((msg) => {
            setInboxLoading(false);
            const inboxItems = JSON.parse(msg.body);
            setInboxItems(inboxItems as InboxItemReceiveDto[]);
        });
    },
    (frame) => {
        if (frame.headers.message.includes('ExpiredJwtException')) {
            // TODO: Add proper handling when jwt expired
            disconnectStomp();
            router.push('/login');
        }
    },
    (frame) => {
        console.log('disconnect');
    });
}