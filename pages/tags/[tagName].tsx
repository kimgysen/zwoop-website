import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import FeedList from "@components/widgets/feed/FeedList";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useTronLink from "../../src/service/swr/user/useTronlink";
import Tag from "@models/Tag";
import Post from "@models/Post";
import {Heading} from "@chakra-ui/layout/src/heading";
import {
    connectStomp,
    disconnectStomp,
    initConnectedUsers,
    initPublicChat,
    sendPublicMessage,
    subscribeToConnectedUsers,
    subscribeToPrivateChat,
    subscribeToPublicChat
} from "../../src/service/stomp/StompService";
import {getRawJwt} from "../../src/service/jwt/JwtService";
import PublicChat from "@components/widgets/chat/public/PublicChat";
import PublicChatMessage from "@components/widgets/chat/public/model/PublicChatMessage";
import ChatUser from "@components/widgets/chat/public/model/ChatUser";


const FeedByTag: NextPage = () => {

    const { tronLinkAuth, isTronLinkLoading } = useTronLink();

    const router = useRouter();
    const { tagName } = router.query;

    const [connectedUsers, setConnectedUsers] = useState<ChatUser[]>([]);
    const [messages, setMessages] = useState<PublicChatMessage[]>([]);


    useEffect(() => {
        (async () => {
            if (tagName) {
                const jwt = await getRawJwt();
                const chatRoomId = 'room-' + tagName;

                connectStomp(
                    chatRoomId, jwt,
                    (frame) => {
                        console.log('connect success', frame);
                        initPublicChat((msg) => {
                            const pubMessages = JSON.parse(msg.body);
                            setMessages(pubMessages.reverse());
                        });
                        subscribeToPublicChat(chatRoomId, (msg) => {
                            const pubMsg = JSON.parse(msg.body);
                            setMessages((messages) => [...messages, pubMsg]);
                        });
                        subscribeToPrivateChat((privMsg) => {
                            console.log('Private message received, privMsg');
                        });
                        initConnectedUsers((msg) => {
                            setConnectedUsers(JSON.parse(msg.body));
                        });
                        subscribeToConnectedUsers(chatRoomId, (msg) => {
                            setConnectedUsers(JSON.parse(msg.body));
                        });
                    },
                    (frame) => {
                        console.log('error frame', frame);
                        disconnectStomp();
                        if (frame.headers.message.includes('ExpiredJwtException')) {
                            router.push('/login');
                        }
                        // TODO: Add proper handling when jwt expired
                        console.log('Connect failed', frame);
                    },
                    (frame) => {
                        console.log('disconnect');
                    })
            }

        })();

        return function cleanup() {
            (async () => {
                await disconnectStomp();
            })();
        }

    }, [tagName]);

    const tags: Tag[] = [{ tagId: 1, tagName: 'php' }, { tagId: 2, tagName: 'java' }, { tagId: 3, tagName: 'javascript' }];

    const posts: Post[] = [{ postId: 'abc', asker: { userId: 'abc', nickName: 'kimbo' },
        title: `title ${ tagName } 1`,
        descriptionMd: 'Dummy post text',
        postStatusId: { postStatusId: 1, postStatus: 'OPEN' },
        offer: 0.003,
        tags: [{ tagId: 3, tagName: 'javascript'}, { tagId: 4, tagName: 'react'}]
    }];

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            <WatchList tags={ tags } />
                        </>
                    }
                    centerComponent={
                        <>
                            <Heading
                                as="h2"
                                size="md"
                                py='.5rem'
                                maxHeight={ "2.8rem" }
                                sx={{ overflow: 'hidden' }}
                            >
                                { tagName }
                            </Heading>
                            <FeedList isLoading={false} posts={posts} />
                        </>
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
