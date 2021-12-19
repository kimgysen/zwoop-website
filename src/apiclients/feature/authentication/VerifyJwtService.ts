import axios, {AxiosError} from "axios";
import UnauthorizedException from "../../exception/UnauhtorizedException";

const endpoint = process.env.NEXT_PUBLIC_API_VERIFY_JWT_ENDPOINT;

export const verifyJwt = () => {
    if (!endpoint)
        throw Error('Endpoint to verify JWT not defined in env variables.');
    
    return axios
        .get(endpoint, { withCredentials: true })
        .then(res => res.data)
        .catch((reason: AxiosError) => {
            if (reason.response!.status === 401) {
                throw new UnauthorizedException('Jwt is invalid.');
            }
        });

}
