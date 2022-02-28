import {NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import AppLayout from "@components/layout/AppLayout";
import {useSession} from "next-auth/react";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import PostStepperHoc from "@components/pages/post/post-stepper/PostStepperHoc";
import AskHoc from "@components/pages/ask/AskHoc";
import {getAuthState} from "@components/auth/AuthStateHelper";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";


const Ask: NextPage = () => {
    const { data: session, status } = useSession();

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
    }, [session, status]);

    return (
        <>
            <Head>
                <title>Ask</title>
            </Head>
            <AppLayout authState={ authState }>
                <ThreeColumnLayout
                    leftComponent={ <PostStepperHoc /> }
                    centerComponent={
                        <AskHoc />
                    }
                    rightComponent={ null } />
            </AppLayout>
        </>
    )
}

export default Ask;
