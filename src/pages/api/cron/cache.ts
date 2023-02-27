import { NextApiRequest, NextApiResponse } from "next";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import logger from "@/lib/util/logging";
import { doc, setDoc } from "@firebase/firestore";
import { shows } from "@/lib/db";
import { Show } from "@/models";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const e = await getCalendarEntries();
    const entries = e.map((r: any) => Show.fromJson(r));
    for (const entry of entries) {
      logger.debug("Storing show", entry);
      const showRef = doc(shows, entry.id);
      await setDoc(showRef, {
        title: entry.title,
        date: entry.date,
        creator: entry.creator
      }, { merge: true });
    }
    logger.debug("Stored show", res);
    res.status(200).json({ status: "OK" });
  } catch (err) {
    logger.error(err);
    res.status(500).json({status: "Error"});
  }
  res.end();
};
export default handler;
