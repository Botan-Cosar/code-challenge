import {useObservable} from "../../hooks/useObservable.js";
import * as wordCloudDataStore from "../../service/wordCloudDataStore.js";
import D3Cloud from 'react-d3-cloud';
import {WordCloudData} from "../../model/wordCloudData.js";
import {motion} from "framer-motion";
import {PromiseNoData} from "../PromiseNoData/PromiseNoData.js";
import {useEffect, useState} from "react";

export function WordCloud() {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const promise = useObservable(wordCloudDataStore.wordCloudPromise)
    const error = useObservable(wordCloudDataStore.wordCloudError)
    const data = useObservable(wordCloudDataStore.wordCloudData)

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return (
        <PromiseNoData promise={promise} data={data} error={error}>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <motion.div initial={{scale: 0.1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.5}}
            >
                {/* @ts-ignore */}
                <D3Cloud data={data}
                         width={screenSize.width}
                         height={screenSize.height - 100}
                         fontWeight="bold"
                         fontSize={(word: WordCloudData) => ((word.value + 5) * 5)}
                />
            </motion.div>
            <motion.div className="toast fade show align-items-center text-bg-danger border-0 position-fixed top-10 end-10"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        initial={{y: -100}}
                        animate={{y: 0}}
            >
                <div className="d-flex">
                    <div className="toast-body">
                        {error?.message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                </div>
            </motion.div>
        </PromiseNoData>
    )
}
