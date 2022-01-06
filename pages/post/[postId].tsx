import {NextPage} from "next";
import {useRouter} from "next/router";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import React, {useEffect, useState} from "react";
import {getPostById} from "@apiclients/feature/post/PostService";
import PostView from "@components/pages/post/PostView";
import {useSession} from "next-auth/react";
import ApiRes from "@apiclients/type/ApiResult";
import {getFollowedTags} from "@apiclients/feature/user/UserService";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const { postId } = ctx.query;
    const post = await getPostById(postId);

    return {
        props: { post }
    }
}

const Post: NextPage = (props: any) => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: session, status } = useSession();

    const { post } = props;
    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });

    useEffect(() => {
        (async() => {
            if (session) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);
            }
        })();
    }, [session?.userId]);

    return (
        <>
            <Head>
                <title>Post</title>
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
