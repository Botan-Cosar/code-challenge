import {BehaviorSubject} from "rxjs";
import {WordCloudData} from "../model/wordCloudData.js";

export const wordCloudData = new BehaviorSubject<WordCloudData[] | undefined>(undefined)
export const wordCloudError = new BehaviorSubject<Error | undefined>(undefined)

export const wordCloudFirstFetchMade = new BehaviorSubject<boolean>(false)

export const wordCloudPromise = new BehaviorSubject<Promise<WordCloudData[]> | undefined>(undefined)
export const setWordCloudPromise = (nextState: Promise<WordCloudData[]>) => {
    wordCloudPromise.next(nextState)
    wordCloudData.next([])
    wordCloudError.next(undefined)
    nextState?.then(data => {
        wordCloudFirstFetchMade.next(true)
        wordCloudData.next(data)
    })
        .catch(() => wordCloudError.next(new Error("Failed to generate word cloud")))
        .finally(() => wordCloudPromise.next(undefined));
}
