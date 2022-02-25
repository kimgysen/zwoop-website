import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import GeneralAppChatBox from "@components/pages/chat/GeneralAppChatBox";
import {useSession} from "next-auth/react";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import {getAuthState} from "@components/auth/AuthStateHelper";


const ChatPage: NextPage = () => {
    const { data: session, status } = useSession();
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
    }, [session, status]);


    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <AppLayout authState={ authState }>
                <GeneralAppChatBox messages={[]} />
            </AppLayout>
        </>
    )
}

export default ChatPage;
