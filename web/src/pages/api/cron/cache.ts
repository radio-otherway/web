import { NextApiRequest, NextApiResponse } from "next";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import logger from "@/lib/util/logging";
import { doc, setDoc } from "@firebase/firestore";
import { Settings, Shows } from "@/lib/db/collections";
import { Show } from "@/models";
import { callWebHook } from "@/lib/util/httpUtils";
import { StatusCodes } from "http-status-codes";
import { dateDifferenceInSeconds, isDatePast } from "@/lib/util/dateUtils";

type CalendarParseError = { code: number, errors: any[], stack: string, message: string }
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let retry = false;
  do {
    try {
      logger.debug("Starting sync of shows from google calendar");
      const syncToken = await Settings.read("CalendarSyncToken");
      logger.debug("Starting sync of shows from google calendar");
      const e = await getCalendarEntries(syncToken);
      if (!e?.events) {
        res
          .status(StatusCodes.NO_CONTENT)
          .json({ result: "No calendar entries found" });
      } else {
        const entries: Show[] = e?.events.map((r: any) => Show.fromJson(r));
        for (const entry of entries) {
          if (entry.date !== "Invalid Date" && !isDatePast(new Date(entry.date))) {
            await Shows.set(entry.id, await Shows.wrapShow(entry));
          }
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
    } catch (err: CalendarParseError | any) {
      retry = false;
      if (err.code === 410) {
        if (!retry) { //only retry once
          await Settings.write("CalendarSyncToken", "");
          retry = true;
        }
      } else {
        logger.error(err);
        res.status(500).json({ status: "Error" });
      }
    }
  } while (retry);
  res.end();
};
export default handler;
