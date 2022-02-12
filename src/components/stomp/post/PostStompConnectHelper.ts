import {NextRouter} from "next/router";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {connectPostPrivateChat} from "../../../service/stomp/PrivateChatStompService";
import {redirectToLogin} from "@components/pages/post/post_chat/private_chat/PrivateChatWidgetHelper";
import {connectPostInbox} from "../../../service/stomp/PostInboxStompService";

interface ConnectPostInboxProps {
    postId: string,
    router: NextRouter
}

export const connectToPostInbox = async ({ postId, router }: ConnectPostInboxProps) => {
    const jwt = await getRawJwt();

    connectPostInbox({
        jwt,
        postId,
        router
    });
}


interface ConnectPostPrivateChatProps {
    postId: string,
    partnerId: string,
    router: NextRouter
}

export const connectToPostPrivateChat = async (
    { postId, partnerId, router }: ConnectPostPrivateChatProps) => {
    const jwt = await getRawJwt();

    connectPostPrivateChat({
        jwt,
        postId,
        partnerId,
        redirectToLogin: () => redirectToLogin(router)
    });
}