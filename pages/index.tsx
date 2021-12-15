import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import React from "react";


const HomePage: React.FC = props => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <AppLayout>
                Home
            </AppLayout>
        </>
    );
}

export default HomePage;

