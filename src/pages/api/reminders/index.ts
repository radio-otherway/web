import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, showId } = req.body;
    const docKey = `${userId}_${showId}`;
    const remindersRef = db.collection("reminders");
    const dbShow = remindersRef.doc(docKey);

    const reminder = await remindersRef.doc(docKey).set({
      userId,
      showId,
      created: new Date(),
      notifications: [
        { secondsBefore: 60 * 60, destination: "353868065119" } //just set a single reminder for an hour beforehand
      ]
    }, { merge: true });
    res.status(201).json(reminder);
  } else {
    res.status(405);
  }
  res.end();
};

export default handler;
