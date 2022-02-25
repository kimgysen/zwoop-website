
export const defaultAuthState = {
    isLoading: false,
    isLoggedIn: false,
    principalId: undefined,
    principalAvatar: undefined
}

export default interface AuthState {
    isLoading: boolean,
    isLoggedIn: boolean,
    principalId?: string,
    principalAvatar?: string
}
