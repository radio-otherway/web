import type { NextApiRequest, NextApiResponse } from "next";
import { shows, reminders } from "@/lib/db";
import { addSeconds, dateDifferenceInSeconds } from "@/lib/util/dateUtils";
import { Notification, Reminder, Show } from "@/models";
import { sendSMS } from "@/lib/util/notifications/sms";
import { doc, getDocs, query, where } from "@firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //this handler is called by whatever CRON mechanism we're using
  //it will run every 5 minutes to check
  // if any shows are coming up and send out reminders.

  //get all the shows that are on today
  const upcoming = await getDocs(query(shows, where("date", ">", new Date())));
  // const shows = await db.shows;
  //   .where("date", ">", new Date())
  //   .where("date", "<", addSeconds(new Date(), 60 * 60))
  //   .get()
  // ;

  for (const s of upcoming.docs) {
    const show = s.data() as Show;
    //load all the reminders for this show
    const activeReminders = await getDocs(query(reminders, where("showId", "==", show.id)));

    //this runs every 5 minutes so any shows that have a reminder
    //due in the next 5 minutes should get queued
    for (const r of activeReminders.docs) {
      const reminder = r.data() as Reminder;
      for (let n in reminder.notifications) {
        const notification = Notification.fromJson(n);
        const targetDate = addSeconds(new Date(), notification.secondsBefore * -1);
        if (dateDifferenceInSeconds(targetDate, new Date(show.date)) <= 5 * 60) {
          //time to fire off a notification
          await sendSMS("353868065119", "New show starting in 1 hour");
        }
      }
    }
  }
  res.status(200);
  res.end();
};
export default handler;
