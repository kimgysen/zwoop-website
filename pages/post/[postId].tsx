import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import React, {useEffect, useState} from "react";
import {getPostById} from "@api_clients/feature/post/PostService";
import PostView from "@components/pages/post/PostView";
import {useSession} from "next-auth/react";
import AuthState from "@models/user/AuthState";
import PostChatWidget from "@components/pages/post/PostChatWidget";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import {useRouter} from "next/router";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const { postId } = ctx.query;
    const post = await getPostById(postId);

    return {
        props: { post }
    }
}

const Post: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const { query } = useRouter();
    const { post } = props;

    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });


    useEffect(() => {
        if (session && session.userId) {
            setAuthState({ isLoggedIn: true, principalId: session.userId as string })
        } else {
            setAuthState({ isLoggedIn: false, principalId: null });
        }
    }, [session?.userId]);


    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <AppLayout>
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
                        <PostView post={ post } />
                    }
                    rightComponent={
                        authState.isLoggedIn
                        && (
                            <PostChatWidget
                                authState={ authState }
                                post={ post }
                                queryPartnerId={ query?.partnerId as string }
                            />
                        )
                    }
                />
            </AppLayout>
        </>
    );
}

export default Post;
