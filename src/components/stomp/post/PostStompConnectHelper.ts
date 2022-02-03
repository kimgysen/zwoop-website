import {NextRouter} from "next/router";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {connectPrivateChat} from "../../../service/stomp/PrivateChatStompService";
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


interface ConnectPrivateChatProps {
    postId: string,
    partnerId: string,
    router: NextRouter
}

export const connectToPrivateChat = async (
    { postId, partnerId, router }: ConnectPrivateChatProps) => {
    const jwt = await getRawJwt();

    connectPrivateChat({
        jwt,
        postId,
        partnerId,
        redirectToLogin: () => redirectToLogin(router)
    });
}