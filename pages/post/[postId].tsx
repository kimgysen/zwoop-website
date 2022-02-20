import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import React, {useEffect, useState} from "react";
import {getCsrPostById, getSsrPostById} from "@api_clients/feature/post/PostService";
import PostView from "@components/pages/post/post_view/PostView";
import {useSession} from "next-auth/react";
import AuthState from "@models/user/AuthState";
import PostChatWidget from "@components/pages/post/post_chat/PostChatWidget";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import {useRouter} from "next/router";
import BiddingViewHoc from "@components/pages/post/post-bidding/BiddingViewHoc";
import ApiResult from "@api_clients/type/ApiResult";
import User from "@models/user/User";
import {getUserById} from "@api_clients/feature/user/UserService";
import PostStompConnect from "@components/stomp/post/PostStompConnect";
import {getViewState, isChatAllowed, PostPageViewState} from "@components/pages/post/PostPageHelper";
import {AxiosError, AxiosResponse} from "axios";
import Post from "@models/post/Post";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const {postId} = ctx.query;

    return getSsrPostById(postId)
        .then((resp: AxiosResponse) =>
            ({props: { ssrPost: resp.data, errorCode: null }}))

        .catch((reason: AxiosError) => {
            const statusCode = reason?.response?.status;

            if (statusCode === 404) {
                return { notFound: true }
            } else {
                return { statusCode }
            }

        });
}

const PostByIdPage: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const { query } = useRouter();
    const { ssrPost } = props;

    const queryPartnerId = query?.partnerId;

    const [viewState, setViewState] = useState<PostPageViewState>(PostPageViewState.LOGGED_OFF);
    const [partnerRes, setPartnerRes] = useState<ApiResult<User>>();
    const [post, setPost] = useState<Post>(ssrPost);


    const defaultAuthState = { isLoading: true, isLoggedIn: false };
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        if (status === 'loading') {
            setAuthState({ ...defaultAuthState });
        } else if (session?.userId) {
            setAuthState({ isLoading: false, isLoggedIn: true, principalId: session.userId as string, principalAvatar: session?.user?.image as string });
        } else {
            setAuthState({ isLoading: false, isLoggedIn: false, principalId: undefined, principalAvatar: undefined });
        }
    }, [session, status]);

    useEffect(() => {
        (async() => {
            if (query?.postId) {
                const csrPostRes = await getCsrPostById(query?.postId as string);
                setPost({ ...csrPostRes.success as Post });
            }
        })();
    }, [query?.postId]);

    useEffect(() => {
        (async () => {
            if (!!queryPartnerId) {
                const fetched = await getUserById(queryPartnerId as string);
                setPartnerRes(fetched);
            }
        })();
    }, [queryPartnerId]);

    useEffect(() => {
        if (post.postId && authState.isLoggedIn) {
            const viewState = getViewState(authState, post, queryPartnerId as string);
            setViewState(viewState);
        }
    }, [authState.isLoggedIn, post?.postId, queryPartnerId]);


    return (
        <>
            <Head>
                <title>{ post?.postTitle }</title>
            </Head>
            <AppLayout authState={ authState }>
                <PostStompConnect
                    authState={ authState }
                    viewState={ viewState }
                    post={ post }
                    queryPartnerId={ queryPartnerId as string }
                >
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
                                {
                                    post && (
                                        <>
                                            <PostView
                                                authState={ authState }
                                                post={ post }
                                            />
                                            <BiddingViewHoc
                                                authState={ authState }
                                                post={ post }
                                            />
                                        </>
                                    )
                                }
                            </>
                        }
                        rightComponent={
                            authState.isLoggedIn
                            && isChatAllowed(authState, post)
                            && (
                                <PostChatWidget
                                    authState={ authState }
                                    post={ post }
                                    viewState={ viewState }
                                    partnerRes={ partnerRes }
                                />
                            )
                        }
                    />
                </PostStompConnect>
            </AppLayout>
        </>
    );
}

export default PostByIdPage;
