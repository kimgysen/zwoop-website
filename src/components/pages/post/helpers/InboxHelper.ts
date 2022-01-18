import {NextRouter} from "next/router";
import {getRawJwt} from "../../../../service/jwt/JwtService";
import {connectInbox} from "../../../../service/stomp/InboxStompService";
import {getInitInboxDispatcher} from "../../../../event_dispatchers/inbox/post_inbox/InitPostInboxDispatcher";
import InboxItemReceiveDto from "../../../../service/stomp/receive/InboxItemReceiveDto";


interface ConnectInboxProps {
    postId: string,
    router: NextRouter
}

export const connectToInbox = async ({ postId, router }: ConnectInboxProps) => {
    const jwt = await getRawJwt();
    const SESS_POST_ID = `post-${ postId }`;

    connectInbox({
        jwt,
        postId: SESS_POST_ID,
        router
    })
}

const initInboxItemsDispatcher = getInitInboxDispatcher();

export const addInboxLoadingListener = (cb: (isLoading: boolean) => void) => {
    const initInboxLoadingListener = (ev: CustomEvent<boolean>) => cb(ev.detail);
    initInboxItemsDispatcher.addListenerLoading(initInboxLoadingListener);
    return initInboxLoadingListener;
}

export const addInitInboxListener = (cb: (inboxItems: InboxItemReceiveDto[]) => void) => {
    const initInboxItemsListener = (ev: CustomEvent<InboxItemReceiveDto[]>) => {
        cb(ev.detail);
    }
    initInboxItemsDispatcher.addListener(initInboxItemsListener);
    return initInboxItemsListener;
}

