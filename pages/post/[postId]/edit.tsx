import {NextPage} from "next";
import {getSsrPostById, updatePostApi} from "@api_clients/feature/post/PostApiClient";
import {AxiosError, AxiosResponse} from "axios";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import {Flex} from "@chakra-ui/react";
import EditFormDetailsView from "@components/pages/ask/subviews/EditFormDetailsView";
import SaveButton from "@components/widgets/form/buttons/SaveButton";
import Tag from "@models/db/entity/Tag";
import CancelButton from "@components/widgets/form/buttons/CancelButton";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import {getAuthState} from "@components/auth/AuthStateHelper";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import PostStepperHoc from "@components/pages/post/post-stepper/PostStepperHoc";
import {getPostStatusFromPost, isAnswerAllowed} from "@components/pages/post/PostPageHelper";


export async function getServerSideProps(ctx: { query: { postId: string } }) {
    const {postId} = ctx.query;

    return getSsrPostById(postId)
        .then((resp: AxiosResponse) =>
            ({props: { post: resp.data, errorCode: null }}))
        .catch((reason: AxiosError) =>
            ({ notFound: true }));

}

const PostEditPage: NextPage = (props: any) => {
    const { data: session, status } = useSession();
    const { post } = props;
    const router = useRouter();

    const [isAuthorized, setAuthorized] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(post?.postTitle);
    const [descriptionMd, setDescriptionMd] = useState<string>(post?.postText);
    const [tags, setTags] = useState<Tag[]>(post?.tags);
    const [bidPrice, setBidPrice] = React.useState<string>(post?.bidPrice);
    const [isFormValid, setFormValid] = useState(true);
    const [saveError, setSaveError] = useState<string|null>(null);

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        const authState = getAuthState(session, status);
        setAuthState(authState);

        if (authState?.principalId && router.isReady) {
            isAnswerAllowed(authState, getPostStatusFromPost(post), post?.deal)
            ? setAuthorized(true)
            : router.push(`/post/${ post?.postId }`);
        }

    }, [session, status, router.isReady]);

    const onSave = async (e: any) => {
        const resp = await updatePostApi(post?.postId, {
            title,
            text: descriptionMd,
            tags,
            currencyCode: 'BNB',
            bidPrice
        });

        if (resp.error) {
            setSaveError(resp.error);
        } else {
            router.push(`/post/${ post?.postId }`);
        }
    }

    return (
        <>
            <Head>
                <title>Post edit page</title>
            </Head>
            <AppLayout authState={ authState }>
                <ThreeColumnLayout
                    leftComponent={
                        <PostStepperHoc post={ post } />
                    }
                    centerComponent={
                        isAuthorized
                        && (
                            <>
                                <EditFormDetailsView
                                    post = {{ title, descriptionMd, tags, bidPrice }}
                                    setters={{
                                        setTitle,
                                        setDescriptionMd,
                                        setTags,
                                        setBidPrice
                                    }}
                                />
                                <Flex
                                    mt={5}
                                    pb={10}
                                    justifyContent={'flex-end'}
                                >
                                    <CancelButton
                                        onCancel={ () => {
                                            router.push(`/post/${ post?.postId }`)
                                        }}
                                    />
                                    <SaveButton
                                        label='Publish'
                                        onSave = { onSave }
                                        shouldDisableSave={ !isFormValid }
                                        saveError={ saveError }
                                    />
                                </Flex>
                            </>
                        )
                    }
                    rightComponent={ null }
                />
            </AppLayout>
        </>
    );}

export default PostEditPage;
