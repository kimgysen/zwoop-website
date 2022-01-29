import {NextRouter} from "next/router";
import {getRawJwt} from "../../../service/jwt/JwtService";
import {connectGeneralApp} from "../../../service/stomp/GeneralAppStompService";

interface ConnectAppProps {
    router: NextRouter
}


export const connectToGeneralApp = async ({ router }: ConnectAppProps) => {
    const jwt = await getRawJwt();

    connectGeneralApp({
        jwt,
        redirectToLogin: () => router.push('/login')
    });

}
