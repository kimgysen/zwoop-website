import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import {Heading} from "@chakra-ui/layout/src/heading";
import {useSession} from "next-auth/react";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import AppStompConnect from "@components/stomp/app/AppStompConnect";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import FeedListHoc from "@components/widgets/feed/FeedListHoc";
import {FeedTypeEnum} from "@api_clients/feature/post/PostApiClient";
import {getAuthState} from "@components/auth/AuthStateHelper";
import {PostStatusEnum} from "@models/db/entity/PostStatus";


const HomePage: React.FC = () => {

    const { data: session, status } = useSession();

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
    }, [session, status]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <AppStompConnect>
                <AppLayout authState={ authState }>
                    <ThreeColumnLayout
                        leftComponent={
                            authState.isLoggedIn
                            && (
                                <WatchListHoc
                                    authState={ authState }
                                />
                            )
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
                                    Latest questions
                                </Heading>

                                <FeedListHoc
                                    feedType={ FeedTypeEnum.FEED_ALL }
                                    postStatus={ PostStatusEnum.POST_INIT }
                                    page={ 0 }
                                    pageSize={ 50 }
                                />
                            </>
                        }
                        rightComponent={
                            <>
                            </>
                        }
                    />
                </AppLayout>
            </AppStompConnect>
        </>
    );
}

export default HomePage;
