import {z} from 'zod'

export const WordCloudData = z.object({
    text: z.string(),
    value: z.number()
})

export type WordCloudData = z.infer<typeof WordCloudData>
