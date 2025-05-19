'use client'
import { Tweet } from '@shared/types'
import { Card, CardContent, CardHeader, CardTitle, Use } from '@shared/ui'
import { CreateTweet } from '@widgets/CreateTweet'
import { FC, Suspense, useState } from 'react'

interface Props {
    tweetsPromise: Promise<Tweet[]>
}

export const TweetsList: FC<Props> = ({ tweetsPromise: _tweetsPromise }) => {
    const [tweetsPromise, setTweetsPromise] = useState(_tweetsPromise)

    return (
        <>
            <CreateTweet setTweetsPromise={setTweetsPromise} />
            <Suspense
                fallback={new Array(10).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className="bg-muted h-32 rounded-xl animate-pulse"
                    />
                ))}
            >
                <Use
                    promise={tweetsPromise}
                    render={({ data: tweets }) =>
                        tweets.map(({ author_id, id, text }) => {
                            return (
                                <Card key={id} className="gap-2">
                                    <CardHeader>
                                        <CardTitle>{author_id}</CardTitle>
                                    </CardHeader>
                                    <CardContent
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    ></CardContent>
                                </Card>
                            )
                        })
                    }
                />
            </Suspense>
        </>
    )
}
