import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React, {useEffect, useState} from "react";
import GeneralAppChatBox from "@components/pages/chat/GeneralAppChatBox";
import {useSession} from "next-auth/react";
import AuthState from "@models/user/AuthState";


const ChatPage: NextPage = () => {
    const { data: session } = useSession();
    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });

    useEffect(() => {
        if (session && session.userId) {
            setAuthState({ isLoggedIn: true, principalId: session.userId as string })
        } else {
            setAuthState({ isLoggedIn: false, principalId: undefined });
        }
    }, [session?.userId]);


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
