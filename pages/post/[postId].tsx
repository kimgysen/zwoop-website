import {NextPage} from "next";
import {useRouter} from "next/router";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import React, {useEffect, useState} from "react";
import {getPostById} from "@apiclients/feature/post/PostService";
import PostView from "@components/pages/post/PostView";
import {useSession} from "next-auth/react";
import ApiRes from "@apiclients/type/ApiResult";
import {getFollowedTags} from "@apiclients/feature/user/UserService";
import PostChatWidget from "@components/pages/post/chat/post/chatwidget/PostChatWidget";
import PostInbox from "@components/pages/post/chat/post/inbox/PostInbox";
import {disconnectStomp} from "../../src/service/stomp/StompService";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/pages/post/chat/post/PostChatHeader";
import AuthState from "@models/user/AuthState";
import {
    connectToPrivateChat,
    handleSendPrivateMessage,
    isPostOwner
} from "@components/pages/post/helpers/PrivateChatHelper";
import {connectToInbox} from "@components/pages/post/helpers/InboxHelper";
import InboxDetail from "@models/chat/InboxDetail";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const { postId } = ctx.query;
    const post = await getPostById(postId);

    return {
        props: { post }
    }
}

const Post: NextPage = (props: any) => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const { postId } = router.query;
    const { post } = props;


    enum ChatViewState { LOGGED_OFF, VISITOR_PRIVATE_CHAT, INBOX, INBOX_DETAIL_CHAT }

    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });
    const [chatViewState, setChatViewState] = useState<ChatViewState>(ChatViewState.LOGGED_OFF);
    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [inboxDetail, setInboxDetail] = useState<InboxDetail>({ isActive: false, partner: undefined });


    useEffect(() => {
        (async() => {
            if (session && session.userId) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);

                setAuthState({ isLoggedIn: true, principalId: session.userId as string })
            }
        })();
    }, [session?.userId]);

    useEffect(() => {
        (async() => {
            if (postId && authState.isLoggedIn) {
                const isOwner = isPostOwner(authState, post);

                if (!authState.isLoggedIn) {
                    setChatViewState(ChatViewState.LOGGED_OFF);

                } else if (!isOwner) {
                    setChatViewState(ChatViewState.VISITOR_PRIVATE_CHAT);
                    await connectToPrivateChat({
                        postId: post.postId,
                        partnerId: post.asker.userId,
                        router
                    });

                } else if (isOwner && !inboxDetail.isActive) {
                    setChatViewState(ChatViewState.INBOX);
                    await connectToInbox({
                        postId: post.postId,
                        router
                    });

                } else if (isOwner && inboxDetail.isActive) {
                    setChatViewState(ChatViewState.INBOX_DETAIL_CHAT);
                    await connectToPrivateChat({
                        postId: post.postId,
                        partnerId: inboxDetail.partner?.partnerId!,
                        router
                    });
                }
            }
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }
    }, [postId, authState.isLoggedIn, inboxDetail]);


    const isOwner = isPostOwner(authState, post);

    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            {
                                authState.isLoggedIn &&
                                    <WatchList tagsRes={ followedTagsRes } />
                            }
                        </>
                    }
                    centerComponent={
                        <PostView post={ post } />
                    }
                    rightComponent={
                        <Card p={ 1 }>
                            <PostChatHeader
                                isOwner={ isOwner as boolean }
                                partnerNickName={ isOwner ? null : post.asker.nickName }
                                inboxDetail={ inboxDetail }
                                setInboxDetail={ setInboxDetail }
                            />
                            {
                                chatViewState === ChatViewState.LOGGED_OFF &&
                                    <></>
                            }
                            {
                                chatViewState === ChatViewState.VISITOR_PRIVATE_CHAT &&
                                    <PostChatWidget
                                        postId={ post.postId }
                                        ownerId={ authState.principalId as string }
                                        partner={{
                                            partnerId: post.asker.userId,
                                            partnerNickName: post.asker.nickName,
                                            partnerAvatar: post.asker.profilePic
                                        }}
                                        sendMessage={ handleSendPrivateMessage }
                                        isLoading={ false }
                                    />
                            }
                            {
                                chatViewState === ChatViewState.INBOX &&
                                    <PostInbox
                                        setInboxDetail={ setInboxDetail }
                                    />
                            }
                            {
                                chatViewState === ChatViewState.INBOX_DETAIL_CHAT &&
                                    <PostChatWidget
                                        postId={ post.postId }
                                        ownerId={ authState.principalId as string }
                                        partner={ inboxDetail.partner! }
                                        sendMessage={ handleSendPrivateMessage }
                                        isLoading={ false }
                                    />
                            }
                        </Card>
                    }
                />
            </AppLayout>
        </>
    );
}

export default Post;
