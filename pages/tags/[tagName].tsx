import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import FeedList from "@components/widgets/feed/FeedList";
import TronlinkBanner from "@components/pages/home/tronlink-banner/TronlinkBanner";
import React from "react";
import {useRouter} from "next/router";
import useTronLink from "../../src/swr/user/useTronlink";
import Tag from "@models/Tag";
import Post from "@models/Post";
import {Heading} from "@chakra-ui/layout/src/heading";


const FeedByTag: NextPage = () => {

    const { tronLinkAuth, isTronLinkLoading } = useTronLink();

    const router = useRouter();
    const { tagName } = router.query;


    const tags: Tag[] = [{ tagId: 1, tagName: 'php' }, { tagId: 2, tagName: 'java' }, { tagId: 3, tagName: 'javascript' }];

    const posts: Post[] = [{ postId: 'abc', asker: { userId: 'abc', nickName: 'kimbo' },
        postTitle: `title ${ tagName } 1`,
        postText: 'Dummy post text',
        postStatusId: { postStatusId: 1, postStatus: 'OPEN' },
        bidPrice: 1500,
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

export default FeedByTag;