import "firebase/messaging";
import localforage from "localforage";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/lib/db";

const firebaseCloudMessaging = {
  init: async (): Promise<string | null> => {
    try {
      const messaging = getMessaging(firebaseApp);
      const tokenInLocalForage = await localforage.getItem("fcm_token");
      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage as string;
      }
      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === "granted") {
        // Get new token from Firebase
        const token = await getToken(messaging, {
          vapidKey: process.env.WEBPUSH_VAPID_KEY,
        });
        // Set token in our local storage
        if (token) {
          await localforage.setItem("fcm_token", token);
          return token;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  },
};
export { firebaseCloudMessaging };
