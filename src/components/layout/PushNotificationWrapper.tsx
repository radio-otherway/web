import { firebaseCloudMessaging } from "@/lib/auth/firebaseMessaging";
import * as firebase from "firebase/app";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "@/lib/auth/firebase";
import ToastService from "../widgets/toast";

const PushNotificationWrapper = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
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
};

export default PushNotificationWrapper;
