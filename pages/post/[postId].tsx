import {NextPage} from "next";
import {useRouter} from "next/router";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import React from "react";
import Tag from "@models/Tag";
import {getPostById} from "@apiclients/feature/post/PostService";
import PostView from "@components/pages/post/PostView";


export async function getServerSideProps(ctx: { query: { postId: any; }; }) {
    const { postId } = ctx.query;
    const data = await getPostById(postId);
    // Pass data to the page via props
    return {
        props:
            { post: data }
    }
}

const Post: NextPage = (props: any) => {
    const router = useRouter();
    const { postId } = router.query;

    const { post } = props;
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
                        <PostView post={ post } />
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
