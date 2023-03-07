import React from "react";
import localforage from "localforage";
import { firebaseCloudMessaging } from "@/lib/util/notifications/firebaseMessaging";
import { MdOutlineNotificationsActive } from "react-icons/md";

const RequestPushNotifications = () => {
  const _checkNotifications = async () => {
    //clear any existing tokens as we will be re-requesting
    await localforage.removeItem("fcm_token");
    await firebaseCloudMessaging.init();
  };
  return (
    <button
      type="button"
      className="btn-primary btn gap"
      onClick={() => {
        _checkNotifications().catch((err: any) => {
          console.error(err);
        });
      }}
    >
      <MdOutlineNotificationsActive className="w-6 h-6" />
      Enable Desktop Notifications
    </button>
  );
};

export default RequestPushNotifications;
