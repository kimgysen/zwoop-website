import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import React, {useEffect, useState} from "react";
import {getCsrPostById, getSsrPostById} from "@api_clients/feature/post/PostApiClient";
import PostViewHoc from "@components/pages/post/post_view/PostViewHoc";
import {useSession} from "next-auth/react";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import PostChatWidget from "@components/pages/post/post_chat/PostChatWidget";
import {useRouter} from "next/router";
import PostStatusViewHoc from "@components/pages/post/post-status/PostStatusViewHoc";
import ApiResult from "@api_clients/type/ApiResult";
import User from "@models/db/entity/User";
import {getUserById} from "@api_clients/feature/user/UserApiClient";
import PostStompConnect from "@components/stomp/post/PostStompConnect";
import {getViewState, isChatAllowed, PostPageViewState} from "@components/pages/post/PostPageHelper";
import Post from "@models/db/entity/Post";
import {getAuthState} from "@components/auth/AuthStateHelper";
import {AxiosError, AxiosResponse} from "axios";
import PostStepperHoc from "@components/pages/post/post-stepper/PostStepperHoc";


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

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
    const [viewState, setViewState] = useState<PostPageViewState>(PostPageViewState.LOGGED_OFF);
    const [partnerRes, setPartnerRes] = useState<ApiResult<User>>();
    const [post, setPost] = useState<Post>(ssrPost);


    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
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
        if (post?.postId && authState.isLoggedIn) {
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
                            <PostStepperHoc
                                post={ post }
                            />
                        }
                        centerComponent={
                            <>
                                {
                                    post && (
                                        <>
                                            <PostViewHoc
                                                authState={ authState }
                                                post={ post }
                                            />
                                            <PostStatusViewHoc
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
