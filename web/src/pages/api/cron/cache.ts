import { NextApiRequest, NextApiResponse } from "next";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import logger from "@/lib/util/logging";
import { doc, setDoc } from "@firebase/firestore";
import { shows } from "@/lib/db";
import { Show } from "@/models";
import Settings from "@/lib/db/settings";
import { notificationSchedules } from "@/lib/db/index";
import { addSeconds } from "@/lib/util/dateUtils";
import { callWebHook } from "@/lib/util/httpUtils";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    logger.debug("Starting sync of shows from google calendar");
    const syncToken = await Settings.read("CalendarSyncToken");
    const e = await getCalendarEntries(syncToken);
    if (!e?.events) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ result: "No calendar entries found" });
    } else {
      const entries: Show[] = e?.events.map((r: any) => Show.fromJson(r));
      for (const entry of entries) {
        const showRef = doc(shows, entry.id);
        await setDoc(
          showRef,
          {
            title: entry.title,
            date: entry.date,
            creator: entry.creator,
          },
          { merge: true }
        );
        const schedules = [
          addSeconds(new Date(entry.date), -3600), //an hour before
          addSeconds(new Date(entry.date), 0), //on time
        ];
        const notificationSchedulRef = await setDoc(
          doc(notificationSchedules, entry.id),
          Object.assign({}, { scheduleTimes: schedules }),
          { merge: true }
        );
      }
      if (e?.syncToken) {
        await Settings.write("CalendarSyncToken", e?.syncToken);
      }
      //ping the scheduler to let it know stuff has changed
      if (entries.length > 0) {
        const result = await callWebHook(
          `${process.env.SCHEDULER_API_HOST}/job/reload`
        );
        if (result !== 200) {
          logger.error("cache", "Unable to notify job scheduler");
        }
      }
      res.status(StatusCodes.OK).json({ status: "OK", entries });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ status: "Error" });
  }

  res.end();
};
export default handler;
