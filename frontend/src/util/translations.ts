import {Mode} from "../model/mode.js";

export const t = {
    [Mode.RSS]: {
        dropdownText: "RSS",
        tooltip: `Ex:
        - https://www.reddit.com/.rss
        - http://feeds.bbci.co.uk/news/world/rss.xml
        - http://www.cbn.com/cbnnews/world/feed/`
    },
    [Mode.TWITTER_HASHTAG]: {
        dropdownText: "Twitter Hashtag",
        tooltip: "Ex: Hello"
    },
    title: "Word Cloud Generator"
}
