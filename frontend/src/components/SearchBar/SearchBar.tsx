import {SyntheticEvent, useState} from "react";
import {Mode} from "../../model/mode.js";
import {t} from "../../util/translations.js";
import {fetchRssData, fetchTwitterData} from "../../service/apiService.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import * as wordCloudDataStore from "../../service/wordCloudDataStore.js";

export function SearchBar() {
    const [mode, setMode] = useState(Mode.RSS);

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            inputField: { value: string }
        }

        const functionToCall = mode === Mode.RSS
            ? () => fetchRssData({rssFeedUrl: target.inputField.value})
            : () => fetchTwitterData({hashtag: target.inputField.value})

        wordCloudDataStore.setWordCloudPromise(functionToCall())
    }

    return (
        <form className="w-50 m-auto" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="input-group">
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-dark dropdown-toggle w-100 rounded-pill-left" data-bs-toggle="dropdown">
                            {t[mode].dropdownText}
                        </button>
                        <div className="dropdown-menu">
                            {Object.values(Mode).map(v =>
                                <button key={v} type="button" className="dropdown-item" onClick={() => setMode(v)}>{t[v].dropdownText}</button>
                            )}
                        </div>
                    </div>
                    <input id="inputField" type="text" className="form-control rounded-pill-right" placeholder="Enter Dataset" data-toggle="tooltip" title={t[mode].tooltip}/>

                    <button type="submit" className="btn no-outline z-5 ml-n3rem">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-dark"></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </form>
    )
}
