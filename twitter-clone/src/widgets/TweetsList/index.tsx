'use client'
import { Tweet } from "@shared/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui";
import { FC, use, useState } from "react";

interface Props {
    tweetsPromise: Promise<Tweet[]>
}

export const TweetsList: FC<Props> = ({ tweetsPromise: _tweetsPromise }) => {
    const [tweetsPromise, setTweetsPromise] = useState(_tweetsPromise)
    const tweets = use(tweetsPromise)

    return <>
        {tweets.map(({ author_id, id, text }) => {
            return <Card key={id} className="gap-2">
                <CardHeader>
                    <CardTitle>{author_id}</CardTitle>
                </CardHeader>
                <CardContent dangerouslySetInnerHTML={{ __html: text }}></CardContent>
            </Card>
        })}
    </>
}