import prisma from "lib/prisma";
import Tweets from "components/Tweets";
import { getTweets } from "lib/data";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const take = 3;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("status", status);
  console.log("session", session);
  if (status === "loading") {
    return null;
  }

  if (session) {
    router.push("/home");
  }
  return (
    <div className="mt-10">
      <Tweets tweets={tweets} />
      <p className="text-center p-4 border m-4">
        <h2 className="mb-10">Join the conversation!</h2>
        <Link href="/api/auth/signin">
          <a className="border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker">
            login
          </a>
        </Link>
      </p>
    </div>
    // <div>
    //   <Link href="/api/auth/signin">
    //     <a className="font-bold text-2xl">login</a>
    //   </Link>
    // </div>
  );
  // return <a href="/api/auth/signin">login</a>;
}
