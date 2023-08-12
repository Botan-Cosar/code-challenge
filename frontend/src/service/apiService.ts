import {RssRequest} from "../model/rssRequest.js";
import {HttpMethods} from "../model/httpMethods.js";
import {TwitterRequest} from "../model/twitterRequest.js";
import {z} from "zod";
import {WordCloudData} from "../model/wordCloudData.js";

function apiCall(endpoint: string, method: string, body: any = null) {
    return fetch(`/api/${endpoint}`,{
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null
    }).then(response => response.json());
}

function fetchWordCloudData(endpoint: string, body: RssRequest | TwitterRequest) {
    return apiCall(endpoint, HttpMethods.POST, body).then(data => {
        const parsed = z.array(WordCloudData).safeParse(data)
        if (parsed.success) {
            return parsed.data
        } else {
            throw new Error()
        }
    })
}

export function fetchRssData(body: RssRequest) {
    return fetchWordCloudData("rss", body)
}

export function fetchTwitterData(body: TwitterRequest) {
    return fetchWordCloudData("twitter_hashtag", body)
}
