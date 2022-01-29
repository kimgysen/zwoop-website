import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React from "react";
import GeneralAppChatBox from "@components/pages/chat/GeneralAppChatBox";


const ChatPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <AppLayout>
                <GeneralAppChatBox messages={[]} />
            </AppLayout>
        </>
    )
}

export default ChatPage;
