import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import AuthState from "@models/user/AuthState";
import {disconnectStomp} from "../../../service/stomp/StompService";
import {connectToPublicChat} from "@components/stomp/tag/TagStompConnectHelper";


interface TagStompConnectProps {
    authState: AuthState,
    tagName: string
}

const TagStompConnect: FC<TagStompConnectProps> = (
    { children, authState, tagName }) => {

    const router = useRouter();

    useEffect(() => {
        (async() => {
            if (tagName) {
                await connectToPublicChat({ tagName, router });
            }
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }

    }, [authState.isLoggedIn, tagName]);

    return (
        <>{ children }</>
    )

}

export default TagStompConnect;
