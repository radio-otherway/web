import type { NextApiRequest, NextApiResponse } from "next";
import { shows, users } from "@/lib/db";
import { Show } from "@/models";
import { doc, getDocs } from "@firebase/firestore";
import { getDoc, query, where } from "firebase/firestore";
import { sendWhatsApp } from "@/lib/util/notifications/sms";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
  const { showId } = req.body;

  const q = await getDoc(doc(shows, showId));
  const show = Show.fromJson(q.data());

  //iterate through every user and get their notifications
  //and send 'em off

  //TODO: Move this out of here
  const usersQuery = await getDocs(
    query(users, where("mobileNumber", "!=", null))
  );
  usersQuery.forEach(async (u) => {
    const user = u.data();
    if (user.mobileNumber) {
      console.log("notify", "sending notification to ", user);
      const message = (process.env.WHATSAPP_SHOW_HOUR as string)
        .replace("{{1}}", user.displayName as string)
        .replace("{{2}}", show.creator);

      await sendWhatsApp(user.mobileNumber, message);
    }
  });
  res.status(StatusCodes.OK).json({ status: "OK" });
  res.end();
};
export default handler;
