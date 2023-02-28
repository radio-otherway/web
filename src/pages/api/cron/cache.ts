import { NextApiRequest, NextApiResponse } from "next";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import logger from "@/lib/util/logging";
import { doc, setDoc } from "@firebase/firestore";
import { shows } from "@/lib/db";
import { Show } from "@/models";
import Settings from "@/lib/db/settings";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const syncToken = await Settings.read("CalendarSyncToken");
    const e = await getCalendarEntries(syncToken);
    if (!e?.events) {
      res.status(204).json({ result: "No calendar entries found" });
    } else {
      const entries = e?.events.map((r: any) => Show.fromJson(r));
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
      if (e?.syncToken) {
        await Settings.write("CalendarSyncToken", e?.syncToken);
      }
      res.status(200).json({ status: "OK", entries });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ status: "Error" });
  }
  res.end();
};
export default handler;
