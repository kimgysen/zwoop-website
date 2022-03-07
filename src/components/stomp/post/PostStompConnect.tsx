import {FC, useEffect} from "react";
import AuthState from "@models/auth/AuthState";
import {useRouter} from "next/router";
import {disconnectStomp} from "../../../service/stomp/StompService";
import {connectToPostInbox, connectToPostPrivateChat} from "@components/stomp/post/PostStompConnectHelper";
import {PostPageViewState} from "@components/pages/post/PostPageHelper";
import PostDto from "@models/dto/rest/receive/post/PostDto";


interface PostStompConnectProps {
    authState: AuthState,
    viewState: PostPageViewState,
    postDto: PostDto,
    queryPartnerId?: string
}

const PostStompConnect: FC<PostStompConnectProps> = (
    { children, authState, viewState, postDto, queryPartnerId }) => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (authState.isLoggedIn && postDto?.postId) {
                switch(viewState) {
                    case PostPageViewState.VISITOR_PRIVATE_CHAT:
                        await connectToPostPrivateChat({
                            postId: postDto?.postId,
                            partnerId: postDto?.op?.userId,
                            router
                        });
                        break;

                    case PostPageViewState.INBOX:
                        if (!queryPartnerId) {
                            await connectToPostInbox({
                                postId: postDto?.postId,
                                router
                            });
                        }
                        break;

                    case PostPageViewState.INBOX_DETAIL_CHAT:
                        if (queryPartnerId) {
                            await connectToPostPrivateChat({
                                postId: postDto?.postId,
                                partnerId: queryPartnerId as string,
                                router
                            });
                        }
                        break;
                }

            }
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }

    }, [authState.isLoggedIn, viewState, postDto?.postId, queryPartnerId]);

    return (
        <>{ children }</>
    )

};

export default PostStompConnect;
