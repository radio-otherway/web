import React from "react";
import localforage from "localforage";
import { firebaseCloudMessaging } from "@/lib/util/notifications/firebaseMessaging";

const RequestPushNotifications = () => {
  const _checkNotifications = async () => {
    //clear any existing tokens as we will be re-requesting
    await localforage.removeItem("fcm_token");
    await firebaseCloudMessaging.init();
  };
  return (
    <button
      type="button"
      className="btn-primary btn"
      onClick={() => {
        _checkNotifications().catch((err: any) => {
          console.error(err);
        });
      }}
    >
      Request Notification Permissions
    </button>
  );
};

export default RequestPushNotifications;
