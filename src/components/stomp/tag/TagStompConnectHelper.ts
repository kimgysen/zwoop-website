import {getRawJwt} from "../../../service/jwt/JwtService";
import {NextRouter} from "next/router";
import {connectPublicChatRoom} from "../../../service/stomp/PublicChatStompService";
import {redirectToLogin} from "@components/pages/post/chat/private_chat/PrivateChatWidgetHelper";


interface ConnectToPubicChatProps {
    tagName: string,
    router: NextRouter
}

export const connectToPublicChat = async(
    { tagName, router }: ConnectToPubicChatProps
) => {
    const jwt = await getRawJwt();
    const SESS_CHATROOM_ID = `room-tag-${ tagName }`;

    connectPublicChatRoom({
        jwt,
        chatRoomId: SESS_CHATROOM_ID,
        redirectToLogin: () => redirectToLogin(router)
    });

}
