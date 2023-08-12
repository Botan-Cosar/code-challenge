interface PromiseNoDataProps {
    promise?: Promise<any>
    data?: any
    error?: Error
    children: JSX.Element[]
}

export function PromiseNoData({promise, data, error, children}: PromiseNoDataProps) {
    const [loadingView, dataView, errorView] = children

    return (
        <>
            {promise
                ? loadingView
                : error
                    ? errorView
                    : data
                        ? dataView
                        : false
            }</>
    )
}
