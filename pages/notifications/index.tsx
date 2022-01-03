import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import {Heading} from "@chakra-ui/layout/src/heading";
import React from "react";


const NotificationsPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Notifications</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                        </>
                    }
                    centerComponent={
                        <>
                            <Heading
                                as="h2"
                                size="md"
                                py='.5rem'
                                maxHeight={ "2.8rem" }
                                sx={{ overflow: 'hidden' }}
                            >
                                Notifications
                            </Heading>

                        </>
                    }
                    rightComponent={
                        <>
                        </>
                    }
                />
            </AppLayout>
        </>
    )
}

export default NotificationsPage;
