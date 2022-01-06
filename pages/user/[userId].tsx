import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import UserCard from "@components/pages/user/UserCard";
import {getFollowedTags, getUserById} from "@apiclients/feature/user/UserService";
import UserMenu from "@components/pages/user/UserMenu";
import {useSession} from "next-auth/react";
import ApiRes from "@apiclients/type/ApiResult";


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

    const [followedTagsRes, setFollowedTagsRes] = useState<ApiRes>({ loading: true, success: null, error: null });

    useEffect(() => {
        (async() => {
            if (session?.userId) {
                const res = await getFollowedTags(session.userId as string);
                setFollowedTagsRes(res);
            }
        })();
    }, [session?.userId]);

    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            {
                                session?.userId &&
                                    <WatchList tagsRes={ followedTagsRes } />
                            }
                        </>
                    }
                    centerComponent={
                        userRes.success &&
                            <Box>
                                <UserCard user={ userRes.success }
                                          loggedInUserId={ session?.userId as string }
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
