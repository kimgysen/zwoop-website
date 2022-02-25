import {Session} from "next-auth";
import AuthState, {defaultAuthState} from "@models/auth/AuthState";

export const getAuthState = (session: Session | null, status: string): AuthState => {
    if (status === 'loading') {
        return {
            ...defaultAuthState,
            isLoading: true
        };

    } else if (session?.userId) {
        return {
            ...defaultAuthState,
            isLoading: false,
            isLoggedIn: true,
            principalId: session?.userId as string,
            principalAvatar: session?.user?.image as string
        }
    } else {
        return {
            ...defaultAuthState
        }
    }
}