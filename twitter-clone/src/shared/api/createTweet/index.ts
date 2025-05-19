import { Tweet } from '@shared/types'

export const createTweet = (tweetData: Tweet) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/tweets', {
        method: 'POST',
        body: JSON.stringify(tweetData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
