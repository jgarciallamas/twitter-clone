import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  console.log("api/tweet.js");
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "POST") {
    await prisma.tweet.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id },
        },
      },
    });
    res.end();
    return;
  }
  if (req.method === "DELETE") {
    const id = req.body.id;

    const tweet = await prisma.tweet.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (tweet.author.id !== user.id) {
      res.status(401).end();
      return;
    }

    await prisma.tweet.delete({
      where: { id },
    });
    res.status(200).end();
    return;
  }
}
