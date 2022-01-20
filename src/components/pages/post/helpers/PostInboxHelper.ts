import {NextRouter} from "next/router";
import {getRawJwt} from "../../../../service/jwt/JwtService";
import {connectInbox} from "../../../../service/stomp/InboxStompService";
import {getInitPostInboxDispatcher} from "../../../../event_dispatchers/inbox/post_inbox/InitPostInboxDispatcher";
import InboxItemReceiveDto from "../../../../service/stomp/receive/InboxItemReceiveDto";


interface ConnectInboxProps {
    postId: string,
    router: NextRouter
}

export const connectToPostInbox = async ({ postId, router }: ConnectInboxProps) => {
    const jwt = await getRawJwt();
    const SESS_POST_ID = `post-${ postId }`;

    connectInbox({
        jwt,
        postId: SESS_POST_ID,
        router
    })
}

const initPostInboxItemsDispatcher = getInitPostInboxDispatcher();

export const addInboxLoadingListener = (cb: (isLoading: boolean) => void) => {
    const initPostInboxLoadingListener = (ev: CustomEvent<boolean>) => cb(ev.detail);
    initPostInboxItemsDispatcher.addListenerLoading(initPostInboxLoadingListener);
    return initPostInboxLoadingListener;
}

export const addInitPostInboxListener = (cb: (inboxItems: InboxItemReceiveDto[]) => void) => {
    const initPostInboxItemsListener = (ev: CustomEvent<InboxItemReceiveDto[]>) => {
        cb(ev.detail);
    }
    initPostInboxItemsDispatcher.addListener(initPostInboxItemsListener);
    return initPostInboxItemsListener;
}
