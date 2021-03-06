import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TagChatWidget from "@components/pages/tag/chat/TagChatWidget";
import {FeedTypeEnum} from "@api_clients/feature/post/PostApiClient";
import {useSession} from "next-auth/react";
import Card from "@components/layout/components/card/Card";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import TagHeaderHoc from "@components/pages/tag/header/TagHeaderHoc";
import FeedListHoc from "@components/widgets/feed/FeedListHoc";
import TagStompConnect from "@components/stomp/tag/TagStompConnect";
import {getAuthState} from "@components/auth/AuthStateHelper";
import {PostStatusEnum} from "@models/enums/PostStatusEnum";


const FeedByTag: NextPage = () => {
    const { data: session, status } = useSession();

    const router = useRouter();
    const query = router.query;

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [isWatchListDirty, setWatchListDirty] = useState<boolean>(true);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
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
                                    authState={ authState }
                                    tagName={ query.tagName as string }
                                    setWatchListDirty={ setWatchListDirty }
                                />
                                <FeedListHoc
                                    feedType={ FeedTypeEnum.FEED_BY_TAG }
                                    postStatus={ PostStatusEnum.POST_INIT }
                                    page={ 0 }
                                    pageSize={ 50 }
                                    tagName={ query.tagName as string }
                                />
                            </>
                        )
                    }
                    rightComponent={
                        <>
                            {
                                authState?.isLoggedIn
                                && <TagStompConnect
                                        tagName={ query.tagName as string }
                                        authState={ authState }
                                    >
                                        <Card>
                                            {
                                                query.tagName
                                                && (
                                                    <TagChatWidget
                                                        tagName={ query.tagName as string }
                                                        authState={ authState }
                                                    />
                                                )
                                            }
                                        </Card>
                                    </TagStompConnect>
                            }
                        </>
                    }
                />
            </AppLayout>
        </>
    );

}

export default FeedByTag;
