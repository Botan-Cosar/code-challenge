import { IncomingMessage, ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import {parseRequestBody} from "../util/parseRequestBody.js";
import {RssRequest} from "../model/rssRequest.js";
import {TwitterRequest} from "../model/twitterRequest.js";
import {generateRssDataset} from "../service/rssService.js";
import {generateTwitterDataset} from "../service/twitterService.js";

export async function router(req: IncomingMessage, res: ServerResponse) {
    try {
        const url = new URL(req.url ?? "/", `http://${req.headers["host"]}`);

        switch (`${req.method} ${url.pathname}`) {
            case "GET /api/challenge":
                res.writeHead(200);
                res.write(
                    await marked(
                        await readFile(
                            fileURLToPath(new URL("../../../CHALLENGE.md", import.meta.url)),
                            "utf8"
                        ),
                        { async: true }
                    )
                );
                break;

            case "POST /api/rss":
                const rssBody = await parseRequestBody(req);
                const rssRequest = RssRequest.safeParse(rssBody);

                const handleBadRssRequest = () => {
                    res.writeHead(400);
                    res.write("Invalid RSS feed url");
                }

                if (rssRequest.success) {
                    try {
                        const dataset = JSON.stringify(await generateRssDataset(rssRequest.data.rssFeedUrl));
                        res.setHeader("Content-Type", "application/json");
                        res.writeHead(200);
                        res.write(dataset);
                    } catch (e) {
                        handleBadRssRequest();
                    }
                } else {
                    handleBadRssRequest();
                }

                break;

            case "POST /api/twitter_hashtag":
                const twitterBody = await parseRequestBody(req);
                const twitterRequest = TwitterRequest.safeParse(twitterBody);

                const handleBadTwitterRequest = () => {
                    res.writeHead(400);
                    res.write("Invalid Twitter Hashtag");
                }

                if (twitterRequest.success) {
                    try {
                        const dataset = JSON.stringify(await generateTwitterDataset(twitterRequest.data.hashtag));
                        res.setHeader("Content-Type", "application/json");
                        res.writeHead(200);
                        res.write(dataset);
                    } catch (e) {
                        handleBadTwitterRequest();
                    }
                } else {
                    handleBadTwitterRequest();
                }

                break;

            default:
                res.writeHead(404);
                res.write("Not Found");
                break;
        }
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.write("Something went wrong! Check the console...");
    } finally {
        res.end();
    }
}
