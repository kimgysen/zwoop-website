import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {connectToGeneralApp} from "@components/stomp/app/AppStompConnectHelper";
import {disconnectStomp} from "../../../service/stomp/StompService";


const AppStompConnect: FC = ({ children }) => {

    const router = useRouter();

    useEffect(() => {
        (async () => {
            await connectToGeneralApp({ router });
        })();

        return () => {
            (async () => {
                await disconnectStomp();
            })();
        }
    }, []);

    return (
        <>
            { children }
        </>
    )

};

export default AppStompConnect;
