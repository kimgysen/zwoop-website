import {NextPage} from "next";
import Head from "next/head";
import AppLayout from "@components/layout/AppLayout";
import ThreeColumnLayout from "@components/layout/column-layouts/ThreeColumnLayout";
import WatchList from "@components/widgets/watchlist/WatchList";
import {Heading} from "@chakra-ui/layout/src/heading";
import React from "react";
import Tag from "@models/Tag";
import UserCard from "@components/widgets/usercard/UserCard";


const UserProfile: NextPage = () => {

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
                        <>
                            <Heading
                                as="h2"
                                size="md"
                                py='.5rem'
                                maxHeight={ "2.8rem" }
                                sx={{ overflow: 'hidden' }}
                            >
                                User profile
                            </Heading>
                                <UserCard user={ null } />
                        </>
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
