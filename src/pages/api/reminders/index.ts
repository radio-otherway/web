import { NextApiRequest, NextApiResponse } from "next";
import { reminders } from "@/lib/db";
import { doc, setDoc } from "@firebase/firestore";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  } else {
    const { userId, showId } = req.body;
    const docKey = `${userId}_${showId}`;
    const remindersRef = doc(reminders, docKey);
    await setDoc(
      remindersRef,
      {
        userId,
        showId,
        notifications: [
          { secondsBefore: 60 * 60, destination: "353868065119" }, //just set a single reminder for an hour beforehand
        ],
      },
      { merge: true }
    );
  }
  res.status(StatusCodes.CREATED);
  res.end();
};

export default handler;
