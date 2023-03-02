"use client";
import { useFirebaseAuth } from "@/lib/auth";
import { Show } from "@/models";
import React from "react";
import { MdAddAlarm } from "react-icons/md";
import ToastService from "./toast/toastService";

const RemindMeButton = ({ showId }: { showId: string }) => {
  const { profile } = useFirebaseAuth();
  const createShowReminder = async () => {
    if (profile?.id) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: profile?.id,
            showId: profile?.id
          })
        }
      );
      if (response.status === 201) {
        ToastService.success("Reminder created successfully");
      } else {
        ToastService.error("Unable to create reminder at this time");
      }
    }
  };
  return (
    <button
      className="gap-2 btn"
      onClick={async () => await createShowReminder()}
    >
      <MdAddAlarm className="w-6 h-6" />
      Remind Me!
    </button>
  );
};

export default RemindMeButton;
