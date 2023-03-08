import logger from "../util/logging";

import admin from "firebase-admin";
import { firebaseConfig } from "@/lib/firebase/index";

admin.initializeApp(firebaseConfig);

const sendCloudMessage = async (
  registration: string,
  title: string,
  body: string
) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: registration,
  };
  try {
    const result = await admin.messaging().send(message);
    logger.debug("Admin", "sendCloudMessage", "Message sent successfully");
  } catch (err) {
    logger.error("Admin", "sendCloudMessage", err);
  }
};
const auth = admin.auth();
export { admin, auth, sendCloudMessage };
