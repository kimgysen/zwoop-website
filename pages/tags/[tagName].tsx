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
import PublicMessageReceiveDto from "../../src/service/stomp/receive/PublicMessageReceiveDto";
import ChatRoomUserReceiveDto from "../../src/service/stomp/receive/ChatRoomUserReceiveDto";
import {FeedTypeEnum, getFeed} from "@apiclients/feature/post/PostService";
import ApiRes from "@apiclients/type/ApiResult";
import TagHeader from "@components/pages/tag/TagHeader";
import {useSession} from "next-auth/react";
import {getFollowedTags} from "@apiclients/feature/user/UserService";
import {connectPublicChatRoom} from "../../src/service/stomp/PublicChatStompService";
import Card from "@components/layout/components/card/Card";
import {Spinner} from "@chakra-ui/react";


const FeedByTag: NextPage = () => {

    const { data: session, status } = useSession();

    const router = useRouter();
    const { tagName } = router.query;

    const chatRoomId = `room-tag-` + tagName;

    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [feedRes, setFeedRes] = useState<ApiRes>({ loading: true, success: null, error: null });
    const [connectedUsers, setConnectedUsers] = useState<ChatRoomUserReceiveDto[]>([]);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<PublicMessageReceiveDto[]>([]);

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
        connectPublicChatRoom({
            chatRoomId, jwt, setMessagesLoading, setMessages, setConnectedUsers, router
        });
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
                        <Card>
                            {
                                messagesLoading
                                && <Spinner />
                            }
                            {
                                !messagesLoading
                                && <PublicChat
                                        messages={ messages }
                                        sendMessage={ (message) => sendPublicMessage({ chatRoomId: 'room-tag-' + tagName, message }) }
                                        connectedUsers={ connectedUsers }
                                />
                            }
                        </Card>
                    }
                />
            </AppLayout>
        </>
    );

}

export default FeedByTag;
