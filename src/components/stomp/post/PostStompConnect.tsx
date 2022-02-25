import {FC, useEffect} from "react";
import AuthState from "@models/auth/AuthState";
import {useRouter} from "next/router";
import Post from "@models/db/entity/Post";
import {disconnectStomp} from "../../../service/stomp/StompService";
import {connectToPostInbox, connectToPostPrivateChat} from "@components/stomp/post/PostStompConnectHelper";
import {PostPageViewState} from "@components/pages/post/PostPageHelper";


interface PostStompConnectProps {
    authState: AuthState,
    viewState: PostPageViewState,
    post: Post,
    queryPartnerId?: string
}

const PostStompConnect: FC<PostStompConnectProps> = (
    { children, authState, viewState, post, queryPartnerId }) => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (authState.isLoggedIn && post?.postId) {
                switch(viewState) {
                    case PostPageViewState.VISITOR_PRIVATE_CHAT:
                        await connectToPostPrivateChat({
                            postId: post?.postId,
                            partnerId: post?.op?.userId,
                            router
                        });
                        break;

                    case PostPageViewState.INBOX:
                        if (!queryPartnerId) {
                            await connectToPostInbox({
                                postId: post?.postId,
                                router
                            });
                        }
                        break;

                    case PostPageViewState.INBOX_DETAIL_CHAT:
                        if (queryPartnerId) {
                            await connectToPostPrivateChat({
                                postId: post?.postId,
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

    }, [authState.isLoggedIn, viewState, post?.postId, queryPartnerId]);

    return (
        <>{ children }</>
    )

};

export default PostStompConnect;
