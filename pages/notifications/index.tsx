import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import {Heading} from "@chakra-ui/layout/src/heading";
import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import {getAuthState} from "@components/auth/AuthStateHelper";


const NotificationsPage: NextPage = () => {
    const { data: session, status } = useSession();
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
    }, [session, status]);

    return (
        <>
            <Head>
                <title>Notifications</title>
            </Head>
            <AppLayout authState={ authState }>
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
