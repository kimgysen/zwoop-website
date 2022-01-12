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
import {getRawJwt} from "../../src/service/jwt/JwtService";
import {connectPrivateChat} from "../../src/service/stomp/PrivateChatStompService";
import PostChatWidget from "@components/widgets/chat/post/chatwidget/PostChatWidget";
import PostInbox from "@components/widgets/chat/post/inbox/PostInbox";
import {disconnectStomp, sendMarkInboxItemAsRead, sendPrivateMessage} from "../../src/service/stomp/StompService";
import PrivateMessageReceiveDto from "../../src/service/stomp/receive/PrivateMessageReceiveDto";
import InboxItemReceiveDto from "../../src/service/stomp/receive/InboxItemReceiveDto";
import {connectInbox} from "../../src/service/stomp/InboxStompService";
import Card from "@components/layout/components/card/Card";
import PostChatHeader from "@components/widgets/chat/post/PostChatHeader";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const { postId } = ctx.query;
    const post = await getPostById(postId);

    return {
        props: { post }
    }
}

export interface ChatPartner {
    partnerId: string,
    partnerNickName: string,
    partnerAvatar: string
}

export interface InboxDetail {
    isActive: boolean,
    partner?: ChatPartner
}

const Post: NextPage = (props: any) => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const { postId } = router.query;
    const { post } = props;

    const chatPostId = `room-post-${ postId }`;
    const asker = post.asker;


    enum ChatViewState { UNKNOWN, VISITOR_PRIVATE_CHAT, INBOX, INBOX_DETAIL_CHAT }

    const [chatViewState, setChatViewState] = useState<ChatViewState>(ChatViewState.UNKNOWN);
    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [inboxLoading, setInboxLoading] = useState<boolean>(true);
    const [inboxItems, setInboxItems] = useState<InboxItemReceiveDto[]>([]);
    const [inboxDetail, setInboxDetail] = useState<InboxDetail>({ isActive: false, partner: undefined });
    const [messages, setMessages] = useState<PrivateMessageReceiveDto[]>([]);


    useEffect(() => {
        (async() => {
            if (session && session.userId) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);
            }
        })();
    }, [session?.userId]);

    useEffect(() => {
        (async() => {
            if (postId && session) {
                const isLoggedIn = session?.userId;
                const isOwner = session?.userId === post.asker.userId;

                if (!isLoggedIn) {
                    setChatViewState(ChatViewState.UNKNOWN);

                } else if (!isOwner) {
                    setChatViewState(ChatViewState.VISITOR_PRIVATE_CHAT);
                    await connectToPrivateChat(post.asker.userId);

                } else if (isOwner && !inboxDetail.isActive) {
                    setChatViewState(ChatViewState.INBOX);
                    await connectToInbox();

                } else if (isOwner && inboxDetail.isActive) {
                    setChatViewState(ChatViewState.INBOX_DETAIL_CHAT);
                    await connectToPrivateChat(inboxDetail.partner?.partnerId!);

                }
            }
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }
    }, [postId, session?.userId, inboxDetail]);

    const connectToInbox = async () => {
        const jwt = await getRawJwt();
        connectInbox({
            postId: chatPostId,
            jwt,
            setInboxLoading,
            setInboxItems,
            router
        });
    }

    const connectToPrivateChat = async (partnerId: string) => {
        const jwt = await getRawJwt();
        connectPrivateChat({
            postId: chatPostId,
            jwt,
            partnerId: partnerId,
            setMessages,
            router,
            markInboxItemAsRead
        });
    }

    const handleSendPrivateMessage = (partner: ChatPartner, message: string) => {
        sendPrivateMessage({
            postId: chatPostId,
            message,
            toUserId:  partner.partnerId,
            toUserNickName: partner.partnerNickName,
            toUserAvatar: partner.partnerAvatar
        });
    }

    const markInboxItemAsRead = (partnerId: string) => {
        sendMarkInboxItemAsRead(partnerId);
    }

    const isLoggedIn = session?.userId;
    const isOwner = session?.userId && (session?.userId === asker.userId);

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
                                isLoggedIn &&
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
                                chatViewState === ChatViewState.UNKNOWN &&
                                    <></>
                            }
                            {
                                chatViewState === ChatViewState.VISITOR_PRIVATE_CHAT &&
                                    <PostChatWidget
                                        ownerId={ session?.userId as string }
                                        partner={{
                                            partnerId: post.asker.userId,
                                            partnerNickName: post.asker.nickName,
                                            partnerAvatar: post.asker.profilePic
                                        }}
                                        messages={ messages }
                                        sendMessage={ handleSendPrivateMessage }
                                        isLoading={ false }
                                    />
                            }
                            {
                                chatViewState === ChatViewState.INBOX &&
                                    <PostInbox
                                        setInboxDetail={ setInboxDetail }
                                        inboxLoading={ inboxLoading }
                                        inboxItems={ inboxItems }
                                    />
                            }
                            {
                                chatViewState === ChatViewState.INBOX_DETAIL_CHAT &&
                                    <PostChatWidget
                                        ownerId={ session?.userId as string }
                                        partner={ inboxDetail.partner! }
                                        messages={ messages }
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
