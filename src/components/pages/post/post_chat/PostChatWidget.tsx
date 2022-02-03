import React, {FC, useEffect, useState} from "react";
import AuthState from "@models/user/AuthState";
import Post from "@models/post/Post";
import {isPostOwner, PostPageViewState} from "@components/pages/post/post_view/PostViewHelper";
import PostStompConnect from "@components/stomp/post/PostStompConnect";
import PrivateChatWidget from "@components/pages/post/post_chat/private_chat/PrivateChatWidget";
import PostInbox from "@components/pages/post/post_chat/inbox/PostInbox";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/pages/post/post_chat/PostChatHeader";
import User from "@models/user/User";
import {getUserById} from "@api_clients/feature/user/UserService";
import ApiResult from "@api_clients/type/ApiResult";


interface PostSubViewManagerProps {
    authState: AuthState,
    post: Post,
    queryPartnerId?: string
}

const PostChatWidget: FC<PostSubViewManagerProps> = ({ authState, post, queryPartnerId }) => {
    const [viewState, setViewState] = useState<PostPageViewState>(PostPageViewState.LOGGED_OFF);
    const [partner, setPartner] = useState<ApiResult<User>>();

    useEffect(() => {
        (async () => {
            if (!!queryPartnerId) {
                const fetched = await getUserById(queryPartnerId as string);
                setPartner(fetched);
            }
        })();
    }, [queryPartnerId]);

    useEffect(() => {
        (async () => {
            if (post.postId && authState.isLoggedIn) {
                const isOwner = isPostOwner(authState, post);

                if (!authState.isLoggedIn) {
                    setViewState(PostPageViewState.LOGGED_OFF);

                } else if (!isOwner) {
                    setViewState(PostPageViewState.VISITOR_PRIVATE_CHAT);

                } else if (isOwner && !queryPartnerId) {
                    setViewState(PostPageViewState.INBOX);

                } else if (isOwner && !!queryPartnerId) {
                    setViewState(PostPageViewState.INBOX_DETAIL_CHAT);
                }
            }
        })();
    }, [authState.isLoggedIn, queryPartnerId]);

    const isOwner = isPostOwner(authState, post);

    return (
        <>
            <PostStompConnect
                authState={ authState }
                viewState={ viewState }
                post={ post }
                queryPartnerId={ queryPartnerId as string }
            >
                <Card p={ 1 }>
                    <PostChatHeader
                        postId={ post.postId }
                        viewState={ viewState }
                        partnerNickName={ isOwner
                            ? partner?.success?.nickName as string
                            : post.asker.nickName }
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
                                />
                        }
                        {
                            viewState === PostPageViewState.INBOX_DETAIL_CHAT
                            && partner?.error
                            &&
                            (
                                <>
                                    <i>Couldn&apos;t load the partner</i>
                                </>
                            )
                        }
                        {
                            viewState === PostPageViewState.INBOX_DETAIL_CHAT
                            && partner?.success
                            && (
                                <PrivateChatWidget
                                    postId={ post.postId }
                                    principalId={ authState.principalId as string }
                                    partner={{
                                        partnerId: partner.success.userId,
                                        partnerNickName: partner.success.nickName,
                                        partnerAvatar: partner.success.profilePic
                                    }}
                                    isLoading={ false }
                                />
                            )
                        }
                </Card>
            </PostStompConnect>
        </>
    )
}

export default PostChatWidget;
