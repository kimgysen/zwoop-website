import React, {FC} from "react";
import AuthState from "@models/auth/AuthState";
import Post from "@models/db/entity/Post";
import PrivateChatWidget from "@components/pages/post/post_chat/private_chat/PrivateChatWidget";
import PostInbox from "@components/pages/post/post_chat/inbox/PostInbox";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/pages/post/post_chat/PostChatHeader";
import User from "@models/db/entity/User";
import ApiResult from "@api_clients/type/ApiResult";
import {PostPageViewState} from "@components/pages/post/PostPageHelper";
import {isOp} from "../../../../util/PostUtil";


interface PostSubViewManagerProps {
    authState: AuthState,
    post: Post,
    viewState: PostPageViewState,
    partnerRes?: ApiResult<User>
}

const PostChatWidget: FC<PostSubViewManagerProps> = ({ authState, post, viewState, partnerRes }) => {
    return (
        <>
            <Card p={ "1" }>
                <PostChatHeader
                    postId={ post?.postId }
                    viewState={ viewState }
                    partnerId={
                        isOp(authState, post)
                            ? partnerRes?.success?.userId as string
                            : post?.op?.userId
                    }
                    partnerNickName={
                        isOp(authState, post)
                        ? partnerRes?.success?.nickName as string
                        : post?.op?.nickName }
                />

                    {
                        viewState === PostPageViewState.LOGGED_OFF &&
                            <></>
                    }
                    {
                        viewState === PostPageViewState.VISITOR_PRIVATE_CHAT &&
                            <PrivateChatWidget
                                postId={ post?.postId }
                                principalId={ authState.principalId as string }
                                partner={{
                                    partnerId: post?.op?.userId,
                                    partnerNickName: post?.op?.nickName,
                                    partnerAvatar: post?.op?.profilePic
                                }}
                                isLoading={ false }
                            />
                    }
                    {
                        viewState === PostPageViewState.INBOX &&
                            <PostInbox
                                principalId={ authState.principalId as string }
                                postId={ post?.postId }
                            />
                    }
                    {
                        viewState === PostPageViewState.INBOX_DETAIL_CHAT
                        && partnerRes?.error
                        &&
                        (
                            <>
                                <i>Couldn&apos;t load the partner</i>
                            </>
                        )
                    }
                    {
                        viewState === PostPageViewState.INBOX_DETAIL_CHAT
                        && partnerRes?.success
                        && (
                            <PrivateChatWidget
                                postId={ post?.postId }
                                principalId={ authState.principalId as string }
                                partner={{
                                    partnerId: partnerRes.success.userId,
                                    partnerNickName: partnerRes.success.nickName,
                                    partnerAvatar: partnerRes.success.profilePic
                                }}
                                isLoading={ false }
                            />
                        )
                    }
            </Card>
        </>
    )
}

export default PostChatWidget;
