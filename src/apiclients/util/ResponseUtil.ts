import {AxiosError, AxiosResponse} from "axios";

type ErrorType = {
    status: number,
    message: string
}

interface AxiosResponseProps {
    res: AxiosResponse,
    successStatus: number,
    successProp: any
}

export const handleAxiosResponse = ({ res, successStatus, successProp }: AxiosResponseProps) => {
    if (res.status === successStatus) {
        return {
            loading: false,
            success: successProp,
            error: null
        }
    } else {
        return {
            loading: false,
            success: null,
            error: 'Success status not correct.'
        }
    }
}

export const handleAxiosError = (reason: AxiosError, errors?: ErrorType[]) => {
    if (errors) {
        for (let error of errors) {
            if (reason.response!.status === error.status) {
                return {
                    loading: false,
                    success: null,
                    error: error.message
                }
            }
        }
        return {
            loading: false,
            success: null,
            error: reason.toString()
        }

    } else {
        return {
            loading: false,
            success: null,
            error: reason.toString()
        }
    }
}
