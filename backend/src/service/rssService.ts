import Parser from 'rss-parser'
import {stopWords} from "../constants/stopWords.js";
import {WordCloudData} from "../model/wordCloudData.js";

const parser = new Parser()

export async function generateRssDataset(rssFeedUrl: string): Promise<WordCloudData[]> {
    const parsed = await parser.parseURL(rssFeedUrl)
    const wordCountObject = parsed.items
        .map(item => `${item.title} ${item.content}`
            ?.replace(/<\/?[a-zA-Z]+\b[^>]*>/g, ' ')
            .split(/\s+/)
            .filter(s => /^[a-zA-Z]+$/.test(s))
        )
        .flat()
        .map(s => s.toLowerCase())
        .filter(s => !stopWords.includes(s))
        .reduce((acc: {[key: string]: number}, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {})

    return Object.entries(wordCountObject).map(([text, value]) => ({text, value}))
}
