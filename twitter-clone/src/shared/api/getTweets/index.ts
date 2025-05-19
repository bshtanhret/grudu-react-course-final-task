import { Tweet } from '@shared/types'

export const getTweets = () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/tweets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (res) => {
        // to see loader
        await new Promise((res) => setTimeout(res, 1000))
        return res.json()
    }) as Promise<Tweet[]>
}
