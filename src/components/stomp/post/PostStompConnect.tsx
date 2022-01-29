import {FC, useEffect} from "react";
import AuthState from "@models/user/AuthState";
import {useRouter} from "next/router";
import {PostPageViewState} from "@components/pages/post/PostViewHelper";
import Post from "@models/post/Post";
import InboxDetail from "@models/chat/InboxDetail";
import {disconnectStomp} from "../../../service/stomp/StompService";
import {connectToPostInbox, connectToPrivateChat} from "@components/stomp/post/PostStompConnectHelper";


interface PostStompConnectProps {
    authState: AuthState,
    viewState: PostPageViewState,
    post: Post,
    inboxDetail: InboxDetail
}

const PostStompConnect: FC<PostStompConnectProps> = (
    { children, authState, viewState, post, inboxDetail }) => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
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
                        partnerId: inboxDetail.partner?.partnerId!,
                        router
                    });
                    break;
            }

        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }

    }, [viewState, authState.isLoggedIn, inboxDetail]);

    return (
        <>{ children }</>
    )

};

export default PostStompConnect;
