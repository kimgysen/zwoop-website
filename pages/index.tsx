import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import useTronLink from "../src/service/swr/user/useTronlink";
import TronlinkBanner from "@components/pages/home/tronlink-banner/TronlinkBanner";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import FeedList from "@components/widgets/feed/FeedList";
import Tag from "@models/Tag";
import {PostStatusEnum} from "@models/Post";
import {Heading} from "@chakra-ui/layout/src/heading";
import {FeedTypeEnum, getFeed} from "@apiclients/feature/post/PostService";
import ApiResult from "@apiclients/type/ApiResult";


const HomePage: React.FC = () => {

    const { tronLinkAuth, isTronLinkLoading } = useTronLink();
    const [feedResult, setFeedResult] = useState<ApiResult>({ loading: true, result: [], error: null });

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

    const tags: Tag[] = [{ tagId: '1', tagName: 'php' }, { tagId: '2', tagName: 'java' }, { tagId: '3', tagName: 'javascript' }];

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
                                Latest questions
                            </Heading>

                            <FeedList isLoading={ feedResult.loading }
                                      posts={ feedResult.result }
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
