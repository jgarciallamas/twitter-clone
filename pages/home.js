import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { getTweets } from "lib/data";
import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";

export async function getServerSideProps() {
  console.log("home.js");
  let tweets = await getTweets(prisma);
  // console.log("tweets#1", tweets);
  tweets = JSON.parse(JSON.stringify(tweets));
  // console.log("tweets#2", tweets);

  return {
    props: {
      tweets,
    },
  };
}

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log("router", router);
  // console.log("session", session);
  const loading = status === "loading";

  if (loading) {
    return <p>loading ...</p>;
  }
  if (!session) {
    router.push("/");
  }
  if (session && !session.user.name) {
    router.push("/setup");
  }
  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} />
    </>
  );
  // return <div>{session ? <NewTweet /> : <p>You are not logged in 😞</p>}</div>;
}
