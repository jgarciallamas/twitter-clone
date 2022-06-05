import prisma from "lib/prisma";
import { getUserTweets } from "lib/data.js";
import Tweets from "components/Tweets";

export async function getServerSideProps({ params }) {
  // console.log("params.name", params.name);
  // console.log("prisma", prisma);
  let tweets = await getUserTweets(params.name, prisma);
  tweets = JSON.parse(JSON.stringify(tweets));
  console.log("tweets", tweets);

  return {
    props: {
      name: params.name,
      tweets,
    },
  };
}

export default function UserProfile({ name, tweets }) {
  return (
    <>
      <p className="text-center p-5">User profile of {name}</p>;
      <Tweets tweets={tweets} />
    </>
  );
}
