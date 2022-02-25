import useSWR from "swr";
import {verifyJwt as fetcher} from "../../../api_clients/feature/authentication/VerifyJwtService";
import UnauthorizedException from "../../../api_clients/exception/UnauthorizedException";
import AuthenticatedUser from "@models/auth/AuthenticatedUser";


export default function useAuthenticatedUser() {
    const { data, mutate, error } = useSWR("api_user", fetcher, {
        errorRetryCount: 0
    });

    const loading = !data && !error;
    const loggedOut = error && error instanceof UnauthorizedException;

    return {
        authLoading: loading,
        authLoggedOut: loggedOut,
        authenticatedUser: data as AuthenticatedUser,
        mutateAuth: mutate
    };

}
