
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import {useRouter} from "next/router";


const SignInPage: React.FC = () => {

    const { query, isReady } = useRouter();

    const { data: session, status } = useSession();
    const loading = status === "loading";

    useEffect(() => {
        if (isReady && !loading && !session && query.oauthProvider)
            void signIn(query.oauthProvider as string);
        if (!loading && session) window.close()
    }, [session, loading, isReady]);

    return null;
}

export default SignInPage;
