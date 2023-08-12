import {WordCloudData} from "../model/wordCloudData.js";

/**
 * Returns mocked data
 */
export async function generateTwitterDataset(hashtag: string): Promise<WordCloudData[]> {
    return new Promise<WordCloudData[]>((resolve) => {
        setTimeout(() => {
            resolve([
                "apple", "banana", "cherry", "date", "elderberry",
                "fig", "grape", "honeydew", "kiwi", "lemon",
                "mango", "orange", "pear", "quince", "raspberry",
                "strawberry", "tangerine", "watermelon",
                "blueberry", "blackberry", "pineapple", "coconut",
                "grapefruit", "lime", "peach", "plum", "pomegranate",
                "apricot", "guava", "melon", "papaya", "passionfruit",
                "dragonfruit", "kiwifruit", "lychee", "mulberry", "nectarine",
                "persimmon", "boysenberry", "rhubarb", "cantaloupe", "cucumber",
                "avocado", "tomato", "pumpkin", "squash", "zucchini"
            ].map(s => ({text: s, value: Math.floor(Math.random() * 10) + 1})))
        }, 1000)
    })
}
