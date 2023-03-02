import calendar, { GOOGLE_CALENDAR_ID } from "@/lib/util/google/calendar";
import logger from "../logging";

const getCalendarEntries = async (syncToken?: string) => {
  try {
    const e = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      maxResults: 10,
      singleEvents: true,
      syncToken: syncToken
    });
    const events = _mapEvents(e);
    return events;
  } catch (err) {
    logger.error("calendarReader", "Unable to read events", err);
  }
  return null;
};
const _mapEvents = (events: any) => {
  const mapped = events.data.items.map((r: any) => ({
    id: r.id,
    title: r.summary,
    date: r.start.dateTime,
    creator: r.creator.email
  }));
  return {
    syncToken: events.data.nextSyncToken,
    events: mapped
  };
};
export { getCalendarEntries };
