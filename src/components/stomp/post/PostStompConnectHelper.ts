import {NextRouter} from "next/router";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {connectPrivateChat} from "../../../service/stomp/PrivateChatStompService";
import {redirectToLogin} from "@components/pages/post/chat/private_chat/PrivateChatWidgetHelper";
import {connectPostInbox} from "../../../service/stomp/PostInboxStompService";

interface ConnectPostInboxProps {
    postId: string,
    router: NextRouter
}

export const connectToPostInbox = async ({ postId, router }: ConnectPostInboxProps) => {
    const jwt = await getRawJwt();
    const SESS_POST_ID = `post-${ postId }`;

    connectPostInbox({
        jwt,
        postId: SESS_POST_ID,
        router
    });
}


interface ConnectPrivateChatProps {
    postId: string,
    partnerId: string,
    router: NextRouter
}

export const connectToPrivateChat = async (
    { postId, partnerId, router }: ConnectPrivateChatProps) => {
    const jwt = await getRawJwt();
    const SESS_POST_ID = `post-${ postId }`;

    connectPrivateChat({
        jwt,
        postId: SESS_POST_ID,
        partnerId,
        redirectToLogin: () => redirectToLogin(router)
    });
}