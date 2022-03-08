import {NextRouter} from "next/router";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {connectPostPrivateChat} from "../../../service/stomp/PrivateChatStompService";
import {redirectToLogin} from "@components/pages/post/post_chat/private_chat/PrivateChatWidgetHelper";
import {connectPostInbox} from "../../../service/stomp/PostInboxStompService";
import AuthState from "@models/auth/AuthState";

interface ConnectPostInboxProps {
    authState: AuthState,
    postId: string,
    router: NextRouter
}

export const connectToPostInbox = async ({ authState, postId, router }: ConnectPostInboxProps) => {
    const jwt = await getRawJwt();

    connectPostInbox({
        authState,
        jwt,
        postId,
        router
    });
}


interface ConnectPostPrivateChatProps {
    authState: AuthState,
    postId: string,
    partnerId: string,
    router: NextRouter
}

export const connectToPostPrivateChat = async (
    { authState, postId, partnerId, router }: ConnectPostPrivateChatProps) => {
    const jwt = await getRawJwt();

    connectPostPrivateChat({
        authState,
        jwt,
        postId,
        partnerId,
        redirectToLogin: () => redirectToLogin(router)
    });
}