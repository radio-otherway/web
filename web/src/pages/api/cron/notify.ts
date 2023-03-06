import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { Shows, Users } from "@/lib/db/collections";
import { sendWhatsApp } from "@/lib/util/notifications/sms";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
  const { showId } = req.body;

  const show = await Shows.get(showId);
  const users = await Users.getNotifiable();
  //iterate through every user and get their notifications
  //and send 'em off
  users?.forEach(user => {
    const message = (process.env.WHATSAPP_SHOW_HOUR as string)
      .replace("{{1}}", user.displayName as string)
      .replace("{{2}}", show.creator);
    if (user.mobileNumber) {
      sendWhatsApp(user.mobileNumber, message);
    }
  });

  res.status(StatusCodes.OK).json({ status: "OK" });
  res.end();
};
export default handler;
