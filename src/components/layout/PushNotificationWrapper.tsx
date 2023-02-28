import { firebaseCloudMessaging } from "@/lib/auth/firebaseMessaging";
import * as firebase from "firebase/app";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "@/lib/auth/firebase";
import ToastService from "../widgets/toast";
import { doc, setDoc } from "@firebase/firestore";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import { users } from "@/lib/db";
import logger from "@/lib/util/logging";
import { parseUserAgent } from "react-device-detect";

const PushNotificationWrapper = ({ children }: React.PropsWithChildren) => {
    const router = useRouter();
    const { profile } = useAuthUserContext();
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
              const index = profile.deviceRegistrations?.findIndex(reg => {
                return reg.fcmToken === token;
              });
              if (index !== undefined && index !== -1) {
                if (profile.deviceRegistrations && profile.deviceRegistrations[index]) {
                  profile.deviceRegistrations[index] = newRegistration;
                }
              } else {
                profile.deviceRegistrations?.push(newRegistration);
              }
            }
            const profileWithRegistrations = Object.assign({}, profile);
            await setDoc(doc(users, profile?.id), profileWithRegistrations, { merge: true });
            getMessage();
          } catch (error) {
            console.log(error);
          }
        }
      };
      _getAndStoreRegistrationToken()
        .catch(err => {
          logger.error("PushNotificationWrapper", "_getAndStoreRegistrationToken_error", err);
        });
    }, [profile]);

    function getMessage() {
      const messaging = getMessaging(app);
      onMessage(messaging, (message) => {
        ToastService.custom(
          <div
            onClick={() =>
              message?.data?.url &&
              handleClickPushNotification(message?.data?.url)
            }
          >
            <h5>{message?.notification?.title}</h5>
            <h6>{message?.notification?.body}</h6>
          </div>
        );
      });
    }

    const handleClickPushNotification = (url: string) => {
      router.push(url);
    };
    return (
      <>
      <Toaster />
        {children}
    </>
    );
  }
;

export default PushNotificationWrapper;
