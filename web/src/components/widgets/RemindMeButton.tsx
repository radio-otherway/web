"use client";
import { Show } from "@/models";
import React from "react";
import { MdAddAlarm } from "react-icons/md";
import { useAuth } from "reactfire";
import ToastService from "./toast/toastService";

const RemindMeButton = ({ showId }: { showId: string }) => {
  const { user } = useAuth();
  const createShowReminder = async () => {
    if (user?.id) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            showId: user?.id,
          }),
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
