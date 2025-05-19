import { Tweet } from "@shared/types"

export const getTweets = () => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/tweets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json()) as Promise<Tweet[]>
}