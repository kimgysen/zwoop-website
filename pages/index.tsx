import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import useTronLink from "../src/service/swr/user/useTronlink";
import TronlinkBanner from "@components/pages/home/tronlink-banner/TronlinkBanner";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import FeedList from "@components/widgets/feed/FeedList";
import {PostStatusEnum} from "@models/Post";
import {Heading} from "@chakra-ui/layout/src/heading";
import {FeedTypeEnum, getFeed} from "@apiclients/feature/post/PostService";
import ApiResult from "@apiclients/type/ApiResult";
import ApiRes from "@apiclients/type/ApiResult";
import {getFollowedTags} from "@apiclients/feature/user/UserService";
import {useSession} from "next-auth/react";


const HomePage: React.FC = () => {

    const { tronLinkAuth, isTronLinkLoading } = useTronLink();
    const { data: session, status } = useSession();
    const [feedResult, setFeedResult] = useState<ApiResult>({ loading: true, success: [], error: null });
    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });

    useEffect(() => {
        (async() => {
            if (session) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);
            }
        })();
    }, [session?.userId]);

    useEffect(() => {
        (async () => {
            const res = await getFeed(
                FeedTypeEnum.FEED_ALL,
                PostStatusEnum.OPEN,
                null,
                0,
                50);
            setFeedResult(res);
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
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

                            <FeedList isLoading={ feedResult.loading }
                                      posts={ feedResult.success }
                                      error={ feedResult.error?.toString() }
                            />
                        </>
                    }
                    rightComponent={
                        <>
                            <TronlinkBanner
                                isInstalled={ tronLinkAuth?.isTrxWalletInstalled }
                                isLoggedIn={ tronLinkAuth?.isTrxWalletLoggedIn }
                                isLoading={ isTronLinkLoading }
                            />
                        </>
                    }
                />
            </AppLayout>
        </>
    );
}

export default HomePage;
