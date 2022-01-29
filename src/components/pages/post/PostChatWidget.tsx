import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/user/AuthState";
import Post from "@models/post/Post";
import {isPostOwner, PostPageViewState} from "@components/pages/post/PostViewHelper";
import InboxDetail from "@models/chat/InboxDetail";
import PostStompConnect from "@components/stomp/post/PostStompConnect";
import PrivateChatWidget from "@components/pages/post/chat/private_chat/PrivateChatWidget";
import PostInbox from "@components/pages/post/chat/inbox/PostInbox";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/pages/post/chat/PostChatHeader";


interface PostSubViewManagerProps {
    authState: AuthState,
    post: Post
}

const PostChatWidget: FC<PostSubViewManagerProps> = ({ authState, post }) => {
    const [viewState, setViewState] = useState<PostPageViewState>(PostPageViewState.LOGGED_OFF);
    const [inboxDetail, setInboxDetail] = useState<InboxDetail>({ isActive: false, partner: undefined });

    useEffect(() => {
        (async () => {
            if (post.postId && authState.isLoggedIn) {
                const isOwner = isPostOwner(authState, post);

                if (!authState.isLoggedIn) {
                    setViewState(PostPageViewState.LOGGED_OFF);

                } else if (!isOwner) {
                    setViewState(PostPageViewState.VISITOR_PRIVATE_CHAT);

                } else if (isOwner && !inboxDetail.isActive) {
                    setViewState(PostPageViewState.INBOX);

                } else if (isOwner && inboxDetail.isActive) {
                    setViewState(PostPageViewState.INBOX_DETAIL_CHAT);
                }
            }
        })();
    }, [authState.isLoggedIn, inboxDetail.isActive]);

    const isOwner = isPostOwner(authState, post);

    return (
        <>
            <PostStompConnect
                authState={ authState }
                viewState={ viewState }
                post={ post }
                inboxDetail={ inboxDetail }>

                <Card p={ 1 }>
                    <PostChatHeader
                        isOwner={ isOwner as boolean }
                        partnerNickName={ isOwner ? null : post.asker.nickName }
                        inboxDetail={ inboxDetail }
                        setInboxDetail={ setInboxDetail }
                    />

                        {
                            viewState === PostPageViewState.LOGGED_OFF &&
                                <></>
                        }
                        {
                            viewState === PostPageViewState.VISITOR_PRIVATE_CHAT &&
                                <PrivateChatWidget
                                    postId={ post.postId }
                                    principalId={ authState.principalId as string }
                                    partner={{
                                        partnerId: post.asker.userId,
                                        partnerNickName: post.asker.nickName,
                                        partnerAvatar: post.asker.profilePic
                                    }}
                                    isLoading={ false }
                                />
                        }
                        {
                            viewState === PostPageViewState.INBOX &&
                                <PostInbox
                                    principalId={ authState.principalId as string }
                                    postId={ post.postId }
                                    setInboxDetail={ setInboxDetail }
                                />
                        }
                        {
                            viewState === PostPageViewState.INBOX_DETAIL_CHAT &&
                                <PrivateChatWidget
                                    postId={ post.postId }
                                    principalId={ authState.principalId as string }
                                    partner={ inboxDetail.partner! }
                                    isLoading={ false }
                                />
                        }
                </Card>
            </PostStompConnect>
        </>
    )
}

export default PostChatWidget;
