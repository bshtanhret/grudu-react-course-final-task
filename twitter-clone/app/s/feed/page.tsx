import { getTweets } from "@shared/api";
import { TweetsList } from "@widgets";
import { FC } from "react";

const page: FC = () => {
  const tweetsPromise = getTweets()

  return <div className="max-w-[1200px] m-auto grid gap-8 py-[50px]">
    <h1 className="text-3xl m-auto">Tweets</h1>
    <TweetsList tweetsPromise={tweetsPromise} />
  </div>
};

export default page;
