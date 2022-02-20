import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import {PostStatusEnum} from "@models/post/Post";
import {Heading} from "@chakra-ui/layout/src/heading";
import {useSession} from "next-auth/react";
import AuthState from "@models/user/AuthState";
import AppStompConnect from "@components/stomp/app/AppStompConnect";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import FeedListHoc from "@components/widgets/feed/FeedListHoc";
import {FeedTypeEnum} from "@api_clients/feature/post/PostService";


const HomePage: React.FC = () => {

    const { data: session, status } = useSession();

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
                                    postStatus={ PostStatusEnum.OPEN }
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
