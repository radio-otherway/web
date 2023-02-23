import { Show } from "@/models";
const { google } = require("googleapis");
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_CALENDAR_CREDENTIALS_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL =
  process.env.GOOGLE_CALENDAR_CREDENTIALS_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_CALENDAR_PROJECT_ID;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);
const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});
const getCalendarEntries = async () => {
  try {
    const events = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    return events.data.items;
  } catch (err) {}
  return null;
};

export { getCalendarEntries };
