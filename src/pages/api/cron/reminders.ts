import type { NextApiRequest, NextApiResponse } from "next";
import { shows, reminders, remindersProcessed } from "@/lib/db";
import { addSeconds, dateDifferenceInSeconds } from "@/lib/util/dateUtils";
import { Notification, Reminder, Show } from "@/models";
import { sendSMS } from "@/lib/util/notifications/sms";
import { doc, getDocs, query, setDoc, where } from "@firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //this handler is called by whatever CRON mechanism we're using
  //it will run every 5 minutes to check
  // if any shows are coming up and send out reminders.

  //get all the shows that are on today
  //, where("date", ">", new Date())

  const q = query(
      shows,
      where("date", ">", new Date()),
      where("date", "<", addSeconds(new Date(), 60 * 60 * 2)
      )
    )
  ;
  const upcoming = await getDocs(q);
  for (const s of upcoming.docs) {
    const show = s.data();
    //load all the reminders for this show
    const activeReminders = await getDocs(query(reminders, where("showId", "==", show.id)));

    //this runs every 5 minutes so any shows that have a reminder
    //due in the next 5 minutes should get queued
    for (const r of activeReminders.docs) {
      const reminder = r.data() as Reminder;
      for (let notification of reminder.notifications) {
        const targetDate = addSeconds(new Date(), notification.secondsBefore);
        const differenceInSeconds = dateDifferenceInSeconds(targetDate, show.date);
        if (differenceInSeconds >= 0) {
          //time to fire off a notification
          await sendSMS("353868065119", "New show starting in 1 hour");
          const docKey = `${reminder.userId}_${reminder.showId}`;
          const processedRef = doc(remindersProcessed, docKey);

          await setDoc(processedRef, {
            reminderId: reminder.id,
            dateProcessed: new Date()
          });
        }
      }
    }
  }
  res.status(200);
  res.end();
};
export default handler;
