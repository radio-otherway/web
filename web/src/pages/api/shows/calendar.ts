import { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from "@firebase/firestore";
import logger from "@/lib/util/logging";
import { Show } from "@/models";
import { getCalendarEntries } from "@/lib/util/google/calendarReader";
import { StatusCodes } from "http-status-codes";
import { shows } from "@/lib/db/collections";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resourceId = req.headers["x-goog-resource-id"];
  const channelToken = req.headers["x-goog-channel-token"];
  const channelId = req.headers["x-goog-channel-id"];
  const resourceState = req.headers["x-goog-resource-state"];
  logger.debug(
    "Webhook callback",
    resourceId,
    channelToken,
    channelId,
    resourceState
  );

  const changed = await getCalendarEntries();
  const entries = changed?.events.map((r: any) => Show.fromJson(r));
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
  }
  res.status(StatusCodes.OK).json({ result: "We got pinged" });
  res.end();
};
export default handler;
