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

    const { data: session, status } = useSession();

    const router = useRouter();
    const query = router.query;

    const [isWatchListDirty, setWatchListDirty] = useState<boolean>(true);


    const defaultAuthState = { isLoading: true, isLoggedIn: false };
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        if (status === 'loading') {
            setAuthState({ ...defaultAuthState, isLoading: true })
        } else if (session?.userId) {
            setAuthState({ isLoading: false, isLoggedIn: true, principalId: session.userId as string, principalAvatar: session?.user?.image as string });
        } else {
            setAuthState({ isLoading: false, isLoggedIn: false, principalId: undefined, principalAvatar: undefined });
        }
    }, [session, status]);

    return (
        <>
            <Head>
                <title>Questions per tag</title>
            </Head>
            <AppLayout authState={ authState }>
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
