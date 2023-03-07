import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { Shows, Users } from "@/lib/db/collections";
import { sendEmail, sendSMS, sendWhatsApp } from "@/lib/util/notifications";
import logger from "@/lib/util/logging";
import { sendCloudMessage } from "@/lib/firebase/admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
  const { showId } = req.body;

  const show = await Shows.get(showId);
  const users = await Users.getNotifiable();
  //iterate through every user and get their notifications
  //and send 'em off
  if (!users) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
    res.end();
    return;
  }
  for (const user of users) {
    const message = (process.env.WHATSAPP_SHOW_HOUR as string)
      .replace("{{1}}", user.displayName as string)
      .replace("{{2}}", show.creator);
    // if (user.mobileNumber) {
    //   if (user.notificationsWhatsapp) {
    //     await sendWhatsApp(user.mobileNumber, message);
    //   }
    //   if (user.notificationsMobile) {
    //     await sendSMS(user.mobileNumber, message);
    //   }
    // }
    // if (user.email && user.notificationsEmail) {
    //   await sendEmail(user.email, "New show upcoming on Radio Otherway", message);
    // }
    if (user.notificationsBrowser) {
      void user.deviceRegistrations?.forEach(async reg => {
        void await sendCloudMessage(reg.fcmToken, "New show starting", message);
        logger.debug("Notify", "notificationsBrowser");
      });
    }
  }
  res.status(StatusCodes.OK).json({ status: "OK" });
  res.end();
};
export default handler;
