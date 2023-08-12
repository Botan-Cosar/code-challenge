import {useState} from "react";
import {BehaviorSubject} from "rxjs";
import {useSubscription} from "./useSubscription.js";

export function useObservable<T>(source: BehaviorSubject<T>) {
    const [state, setState] = useState<T>(source.getValue())

    useSubscription(source, setState)

    return state
}
