import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import {Box} from "@chakra-ui/react";
import React from "react";
import Tag from "@models/Tag";
import UserCard from "@components/pages/user/UserCard";
import {getUserById} from "@apiclients/feature/user/UserService";
import UserMenu from "@components/pages/user/UserMenu";


export async function getServerSideProps(ctx: { query: { userId: string } }) {
    const { userId } = ctx.query;
    const res = await getUserById(userId);

    return {
        props: { user: res.result }
    }
}

const UserProfile: NextPage = (props: any) => {
    const { user } = props;

    const tags: Tag[] = [{ tagId: 1, tagName: 'php' }, { tagId: 2, tagName: 'java' }, { tagId: 3, tagName: 'javascript' }];

    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <AppLayout>
                <ThreeColumnLayout
                    leftComponent={
                        <>
                            <WatchList tags={ tags } />
                        </>
                    }
                    centerComponent={
                        <Box>
                            <UserCard user={ user } />
                            <UserMenu userId={ user.userId } />
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
