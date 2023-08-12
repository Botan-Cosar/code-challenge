import {SearchBar} from "./components/SearchBar/SearchBar.js";
import {WordCloud} from "./components/WordCloud/WordCloud.js";
import {motion} from "framer-motion";
import {useObservable} from "./hooks/useObservable.js";
import * as wordCloudDataStore from "./service/wordCloudDataStore.js";
import {t} from "./util/translations.js";

const variants = {
    firstFetchMade: {height: "auto", marginTop: "20px", marginBottom: "20px"},
    firstFetchNotMade: {height: "50vh", marginTop: "0", marginBottom: "40px"},
}

export function App() {
    const firstFetchMade = useObservable(wordCloudDataStore.wordCloudFirstFetchMade)

    return (
        <div>
            <motion.div className="d-flex"
                        variants={variants}
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        animate={firstFetchMade ? "firstFetchMade" : "firstFetchNotMade"}
                        transition={{duration: 1.5}}>
                <div className="mt-auto w-100">
                    {!firstFetchMade ? <h1 className="display-1 text-center">{t.title}</h1> : false}
                    <SearchBar/>
                </div>
            </motion.div>
            <WordCloud/>
        </div>
    );
}
