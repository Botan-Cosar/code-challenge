import {z} from 'zod'

export const TwitterRequest = z.object({
    hashtag: z.string()
})

export type TwitterRequest = z.infer<typeof TwitterRequest>
