import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React from "react";
import PrivateChatBox from "@components/widgets/chat/private/PrivateChatBox";


const ChatPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <AppLayout>
                <PrivateChatBox
                    messages={ [] }
                />
            </AppLayout>
        </>
    )
}

export default ChatPage;
