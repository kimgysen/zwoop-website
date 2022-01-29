
type ApiResult<T> = {
    loading: boolean,
    success: T | null,
    error: string | null
}

export default ApiResult;

