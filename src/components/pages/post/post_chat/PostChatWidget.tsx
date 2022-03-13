import React, {FC} from "react";
import AuthState from "@models/auth/AuthState";
import PrivateChatWidget from "@components/pages/post/post_chat/private_chat/PrivateChatWidget";
import PostInbox from "@components/pages/post/post_chat/inbox/PostInbox";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/pages/post/post_chat/PostChatHeader";
import User from "@models/dto/domain-client-dto/user/UserFullDto";
import ApiResult from "@api_clients/type/ApiResult";
import {PostPageViewState} from "@components/pages/post/PostPageHelper";
import {isOp} from "../../../../util/PostUtil";
import PostDto from "@models/dto/domain-client-dto/post/PostDto";


interface PostSubViewManagerProps {
    authState: AuthState,
    postDto: PostDto,
    viewState: PostPageViewState,
    partnerRes?: ApiResult<User>
}

const PostChatWidget: FC<PostSubViewManagerProps> = ({ authState, postDto, viewState, partnerRes }) => {
    return (
        <>
            <Card p={ "1" }>
                <PostChatHeader
                    postId={ postDto?.postId }
                    viewState={ viewState }
                    partnerId={
                        isOp(authState, postDto)
                            ? partnerRes?.success?.userId as string
                            : postDto?.op?.userId
                    }
                    partnerNickName={
                        isOp(authState, postDto)
                        ? partnerRes?.success?.nickName as string
                        : postDto?.op?.nickName }
                />

                    {
                        viewState === PostPageViewState.LOGGED_OFF &&
                            <></>
                    }
                    {
                        viewState === PostPageViewState.VISITOR_PRIVATE_CHAT &&
                            <PrivateChatWidget
                                postId={ postDto?.postId }
                                principalId={ authState.principalId as string }
                                partner={{
                                    partnerId: postDto?.op?.userId,
                                    partnerNickName: postDto?.op?.nickName,
                                    partnerAvatar: postDto?.op?.avatar
                                }}
                                isLoading={ false }
                            />
                    }
                    {
                        viewState === PostPageViewState.INBOX &&
                            <PostInbox
                                principalId={ authState.principalId as string }
                                postId={ postDto?.postId }
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
                                postId={ postDto?.postId }
                                principalId={ authState.principalId as string }
                                partner={{
                                    partnerId: partnerRes.success.userId,
                                    partnerNickName: partnerRes.success.nickName,
                                    partnerAvatar: partnerRes.success.avatar
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
