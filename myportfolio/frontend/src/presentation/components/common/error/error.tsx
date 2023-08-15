import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

type Props = {
    error: string | FetchBaseQueryError | SerializedError
}
export const ErrorHandler = ({ error }: Props) => {
    if (typeof error === 'string') {
        return (
            <p>{error}</p>
        )
    }
    if ('data' in error) {
        return (
            // <p>{JSON.stringify(error.data)}</p>
            <p>Unknown Error</p>
        )
    }
    if ('message' in error) {
        return (
            // <p>{error.message}</p>
            <p>Unknown Error</p>
        )
    }
    return (
        <p>Unknown Error</p>
    )
}