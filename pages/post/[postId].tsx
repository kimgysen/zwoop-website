import {NextPage} from "next";
import {useRouter} from "next/router";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import React from "react";
import Tag from "@models/Tag";


const Post: NextPage = () => {

    const router = useRouter();
    const { postId } = router.query;

    const tags: Tag[] = [{ tagId: 1, tagName: 'php' }, { tagId: 2, tagName: 'java' }, { tagId: 3, tagName: 'javascript' }];


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
                            Post page
                        </>
                    }
                    rightComponent={
                        <>
                            Chat window
                        </>
                    }
                />
            </AppLayout>
        </>
    );

}

export default Post;
