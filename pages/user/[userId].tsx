import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import UserCard from "@components/pages/user/UserCard";
import {getUserById} from "@api_clients/feature/user/UserApiClient";
import UserMenu from "@components/pages/user/UserMenu";
import {useSession} from "next-auth/react";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";
import WatchListHoc from "@components/widgets/watchlist/WatchListHoc";
import {getAuthState} from "@components/auth/AuthStateHelper";


export async function getServerSideProps(ctx: { query: { userId: string } }) {
    const { userId } = ctx.query;
    const userRes = await getUserById(userId);

    return {
        props: userRes
    }
}

const UserProfile: NextPage = (props: any) => {
    const userRes = props;
    const { data: session, status } = useSession();

    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        setAuthState(
            getAuthState(session, status));
    }, [session, status]);


    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AppLayout authState={ authState }>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            {
                                authState.isLoggedIn &&
                                    <WatchListHoc
                                        authState={ authState }
                                    />
                            }
                        </>
                    }
                    centerComponent={
                        userRes.success &&
                            <Box>
                                <UserCard profileUser={ userRes.success }
                                          principalId={ authState.principalId as string }
                                />
                                <UserMenu userId={ userRes.success.userId } />
                            </Box>
                    }
                    rightComponent={
                        <>
                            Right container Tbd
                        </>
                    }
                />
            </AppLayout>
        </>
    )

}

export default UserProfile;
