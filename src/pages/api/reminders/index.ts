import { NextApiRequest, NextApiResponse } from "next";
import { reminders, shows } from "@/lib/db";
import { addDoc, doc, setDoc } from "@firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, showId } = req.body;
    const docKey = `${userId}_${showId}`;
    const remindersRef = doc(reminders, docKey);
    await setDoc(remindersRef, {
      userId,
      showId,
      notifications: [
        { secondsBefore: 60 * 60, destination: "353868065119" } //just set a single reminder for an hour beforehand
      ]
    }, { merge: true });
    res.status(201);
  } else {
    res.status(405);
  }
  res.end();
};

export default handler;
