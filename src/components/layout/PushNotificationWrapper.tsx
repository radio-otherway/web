import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { firebaseCloudMessaging } from "@/lib/util/notifications/firebaseMessaging";
import { doc, setDoc } from "@firebase/firestore";
import { Users } from "@/lib/db/collections";
import logger from "@/lib/util/logging";
import { getMessaging, onMessage } from "firebase/messaging";
import ToastService from "@/components/widgets/toast";
import { AuthProfileContext } from "@/lib/auth/AuthProfileProvider";
import { parseUserAgent } from "react-device-detect";
import firebaseApp from "@/lib/firebase";

const PushNotificationWrapper = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const { profile } = useContext(AuthProfileContext);
  useEffect(() => {
    const _getAndStoreRegistrationToken = async () => {
      const { ua } = parseUserAgent(window.navigator.userAgent);

      if (!profile) return;
      await setToken();

      // Event listener that listens for the push notification event in the background
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", (event) => {
          console.log("event for the service worker", event);
        });
      }

      // Calls the getMessage() function if the token is there
      async function setToken() {
        try {
          if (!profile) return;
          const token = await firebaseCloudMessaging.init();
          if (token && profile) {
            const newRegistration = {
              fcmToken: token,
              deviceType: ua,
              lastSeen: new Date()
            };
            const index = profile.deviceRegistrations?.findIndex((reg) => {
              return reg.fcmToken === token;
            });
            if (index !== undefined && index !== -1) {
              if (
                profile.deviceRegistrations &&
                profile.deviceRegistrations[index]
              ) {
                profile.deviceRegistrations[index] = newRegistration;
              }
            } else {
              profile.deviceRegistrations?.push(newRegistration);
            }
          }
          const profileWithRegistrations = Object.assign({}, profile);
          await setDoc(doc(Users.collection, profile?.id), profileWithRegistrations, {
            merge: true
          });
          getMessage();
        } catch (error) {
          console.log(error);
        }
      }
    };
    _getAndStoreRegistrationToken().catch((err) => {
      logger.error(
        "PushNotificationWrapper",
        "_getAndStoreRegistrationToken_error",
        err
      );
    });
  }, [profile]);

  const handleClickPushNotification = (url: string) => {
    router.push(url);
  };

  const getMessage = () => {
    const messaging = getMessaging(firebaseApp);
    onMessage(messaging, (message) => {
      ToastService.success(message?.notification?.body as string, message?.notification?.title, {
        duration: 10000
      }, () => message?.data?.url && handleClickPushNotification(message?.data?.url));
    });
  };


  return (
    <>
      {children}
    </>
  );
};
export default PushNotificationWrapper;
