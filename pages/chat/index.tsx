import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React from "react";
import PrivateChatBox from "@components/pages/post/chat/private/PrivateChatBox";


const ChatPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <AppLayout>
                <PrivateChatBox messages={[]} />
            </AppLayout>
        </>
    )
}

export default ChatPage;
