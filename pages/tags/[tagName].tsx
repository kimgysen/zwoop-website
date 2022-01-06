import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import FeedList from "@components/widgets/feed/FeedList";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {PostStatusEnum} from "@models/Post";
import {disconnectStomp, sendPublicMessage} from "../../src/service/stomp/StompService";
import {getRawJwt} from "../../src/service/jwt/JwtService";
import PublicChat from "@components/widgets/chat/public/PublicChat";
import PublicChatMessage from "@components/widgets/chat/public/model/PublicChatMessage";
import ChatUser from "@components/widgets/chat/public/model/ChatUser";
import {FeedTypeEnum, getFeed} from "@apiclients/feature/post/PostService";
import ApiRes from "@apiclients/type/ApiResult";
import TagHeader from "@components/pages/tag/TagHeader";
import {useSession} from "next-auth/react";
import {getFollowedTags} from "@apiclients/feature/user/UserService";
import {connectChatRoom} from "../../src/service/stomp/PublicChatStompService";


const FeedByTag: NextPage = () => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const { tagName } = router.query;

    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [feedRes, setFeedRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [connectedUsers, setConnectedUsers] = useState<ChatUser[]>([]);
    const [messages, setMessages] = useState<PublicChatMessage[]>([]);

    useEffect(() => {
        (async() => {
            if (session) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);
            }
        })();
    }, [session?.userId]);

    useEffect(() => {
        if (tagName) {
            (async () => {
                await getQuestionsFeed();
                await connectToChatRoom();
            })();
        }

        return function cleanup() {
            (async () => {
                await disconnectStomp();
            })();
        }
    }, [tagName]);

    const getQuestionsFeed = async () => {
        const res = await getFeed(
            FeedTypeEnum.FEED_BY_TAG,
            PostStatusEnum.OPEN,
            tagName as string,
            0,
            50);
        setFeedRes(res);
    }

    const connectToChatRoom = async () => {
        const jwt = await getRawJwt();
        const chatRoomId = 'room-' + tagName;

        connectChatRoom({chatRoomId, jwt, messages, setMessages, setConnectedUsers, router});
    }

    return (
        <>
            <Head>
                <title>Questions per tag</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            {
                                session?.userId &&
                                <WatchList tagsRes={ followedTagsRes } />
                            }
                        </>
                    }
                    centerComponent={
                        tagName && (
                            <>
                                <TagHeader
                                    tagName={ tagName as string }
                                    followedTagsRes={ followedTagsRes }
                                    setFollowedTagsRes={ setFollowedTagsRes }
                                />
                                <FeedList isLoading={ feedRes.loading }
                                          posts={ feedRes.success }
                                          error={ feedRes.error?.toString() }
                                />
                            </>
                        )
                    }
                    rightComponent={
                        <>
                            <PublicChat
                                messages={ messages }
                                sendMessage={ (message) => sendPublicMessage('room-' + tagName, message) }
                                connectedUsers={ connectedUsers }
                            />
                        </>
                    }
                />
            </AppLayout>
        </>
    );

}

export default FeedByTag;
