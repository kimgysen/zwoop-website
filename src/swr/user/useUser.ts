
import useSWR from "swr";
import {verifyJwt as fetcher} from "../../api-client/authentication/VerifyJwtService";
import AuthenticatedUser from "../../model/AuthenticatedUser";
import UnauthorizedException from "../../api-client/exception/UnauhtorizedException";


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
