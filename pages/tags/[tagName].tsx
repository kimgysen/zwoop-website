import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {PostStatusEnum} from "@models/post/Post";
import TagChatWidget from "@components/pages/tag/chat/TagChatWidget";
import {FeedTypeEnum} from "@api_clients/feature/post/PostService";
import {useSession} from "next-auth/react";
import Card from "@components/layout/components/card/Card";
import AuthState from "@models/user/AuthState";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import TagHeaderHoc from "@components/pages/tag/header/TagHeaderHoc";
import FeedListHoc from "@components/widgets/feed/FeedListHoc";
import TagStompConnect from "@components/stomp/tag/TagStompConnect";


const FeedByTag: NextPage = () => {

    const { data: session } = useSession();

    const router = useRouter();
    const query = router.query;

    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });
    const [isWatchListDirty, setWatchListDirty] = useState<boolean>(true);


    useEffect(() => {
        (async() => {
            if (session && session.userId) {
                setAuthState({ isLoggedIn: true, principalId: session.userId as string })
            } else {
                setAuthState({ isLoggedIn: false, principalId: undefined });
            }
        })();
    }, [session, session?.userId]);

    return (
        <>
            <Head>
                <title>Questions per tag</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        authState.isLoggedIn
                        && (
                            <WatchListHoc
                                authState={ authState }
                                isDirty={ isWatchListDirty }
                                setIsDirty={ setWatchListDirty }
                            />
                        )
                    }
                    centerComponent={
                        query.tagName
                        && (
                            <>
                                <TagHeaderHoc
                                    tagName={ query.tagName as string }
                                    setWatchListDirty={ setWatchListDirty }
                                />
                                <FeedListHoc
                                    feedType={ FeedTypeEnum.FEED_BY_TAG }
                                    postStatus={ PostStatusEnum.OPEN }
                                    page={ 0 }
                                    pageSize={ 50 }
                                    tagName={ query.tagName as string }
                                />
                            </>
                        )
                    }
                    rightComponent={
                        <TagStompConnect
                            tagName={ query.tagName as string }
                            authState={ authState }
                        >
                            <Card>
                                {
                                    authState.isLoggedIn
                                    && query.tagName
                                    && (
                                        <TagChatWidget
                                            tagName={ query.tagName as string }
                                            principalId={ authState.principalId as string }
                                        />
                                    )
                                }
                            </Card>
                        </TagStompConnect>
                    }
                />
            </AppLayout>
        </>
    );

}

export default FeedByTag;
