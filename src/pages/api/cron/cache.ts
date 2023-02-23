import { NextApiRequest, NextApiResponse } from "next";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import { shows } from "@/lib/db";
import { Show } from "@/models";
import logger from "@/lib/util/logging";
import { doc, setDoc } from "@firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const entries = await getCalendarEntries();
    const shows = entries.map((r: any) => Show.fromJson(r));
    for (const show of shows) {
      logger.debug("Storing show", show);
      const showRef = doc(shows, show.id);
      await setDoc(showRef, {
        title: show.title,
        date: show.date,
        creator: show.creator
      }, { merge: true });
    }
    logger.debug("Stored show", res);
    res.status(200);
  } catch (err) {
    logger.error(err);
    res.status(500);
  }
  res.end();
};
export default handler;
