import calendar, { GOOGLE_CALENDAR_ID } from "@/lib/util/google/calendar";
import { uuidv4 } from "@firebase/util";

const setupCalendarWebhook = async () => {
  calendar.events.watch({
    resource: {
      id: uuidv4(),
      type: "web_hook",
      address: `https://external.fergl.ie/api/shows/calendar`
    },
    calendarId: GOOGLE_CALENDAR_ID
  });
};
export { setupCalendarWebhook };
