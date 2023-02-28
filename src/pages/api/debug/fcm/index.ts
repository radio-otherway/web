import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/util/logging";
import { firebaseAdmin } from "@/lib/auth/firebaseAdmin";
import { doc, getDocs, query, where } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { users } from "@/lib/db";
import { Profile, Reminder } from "@/models";

const _getPayload = (message: string) => ({
  notification: {
    title: "Argle Bargle",
    body: `You are a ${message}`,
    image: "https://otherway.fergl.ie/logo.png"
  },
  data: {
    url: "https://google.com"
  }
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {


  // Send a message to the device corresponding to the provided
  // registration token.
  try {
    const results: any[] = [];
    const userResultSet = await getDocs(query(users, where("email", "==", "fergal.moran@gmail.com")));
    for (let u of userResultSet.docs) {
      const user = u.data() as Profile;
      if (user?.deviceRegistrations) {
        for (const token of user?.deviceRegistrations) {
          results.push(await firebaseAdmin
            .messaging()
            .sendToDevice(
              token.fcmToken,
              _getPayload(token.deviceType)));
        }
      }
    }
    res.status(200).json({ results });
  } catch (err) {
    logger.error("fcm", "sendPush", "Failed", err);
    res.status(500);
  }
  res.end();
};
export default handler;
