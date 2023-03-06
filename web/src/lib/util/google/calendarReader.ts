import calendar, { GOOGLE_CALENDAR_ID } from "@/lib/util/google/calendar";

const getCalendarEntries = async (syncToken?: string) => {
  const e = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    singleEvents: true,
    syncToken: syncToken
  });
  return _mapEvents(e);
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
