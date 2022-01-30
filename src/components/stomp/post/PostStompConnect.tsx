import {FC, useEffect} from "react";
import AuthState from "@models/user/AuthState";
import {useRouter} from "next/router";
import {PostPageViewState} from "@components/pages/post/PostViewHelper";
import Post from "@models/post/Post";
import {disconnectStomp} from "../../../service/stomp/StompService";
import {connectToPostInbox, connectToPrivateChat} from "@components/stomp/post/PostStompConnectHelper";


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
            if (authState.isLoggedIn) {
                switch(viewState) {
                    case PostPageViewState.VISITOR_PRIVATE_CHAT:
                        await connectToPrivateChat({
                            postId: post.postId,
                            partnerId: post.asker.userId,
                            router
                        });
                        break;

                    case PostPageViewState.INBOX:
                        await connectToPostInbox({
                            postId: post.postId,
                            router
                        });
                        break;

                    case PostPageViewState.INBOX_DETAIL_CHAT:
                        await connectToPrivateChat({
                            postId: post.postId,
                            partnerId: queryPartnerId as string,
                            router
                        });
                        break;
                }

            }
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }

    }, [viewState, authState.isLoggedIn]);

    return (
        <>{ children }</>
    )

};

export default PostStompConnect;
