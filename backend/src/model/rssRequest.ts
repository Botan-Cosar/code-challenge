import {z} from 'zod'

export const RssRequest = z.object({
    rssFeedUrl: z.string()
})

export type RssRequest = z.infer<typeof RssRequest>
