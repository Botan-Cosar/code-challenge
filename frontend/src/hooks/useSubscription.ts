import {useEffect} from "react"
import {Observable} from "rxjs"

export function useSubscription<T>(source: Observable<T>, nextHandler: (value: T) => void) {
    useEffect(() => {
        if (source) {
            const subs = source.subscribe(nextHandler)
            return () => subs.unsubscribe()
        }
    }, [source])
}
