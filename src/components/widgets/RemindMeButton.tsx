"use client";
import { Show } from "@/models";
import React, { useContext } from "react";
import { MdAddAlarm } from "react-icons/md";
import { useAuth, useUser } from "reactfire";
import ToastService from "./toast/toastService";
import { AuthProfileContext } from "@/lib/auth/AuthProfileProvider";

const RemindMeButton = ({ showId }: { showId: string }) => {
  const { status, data: user } = useUser();
  const createShowReminder = async () => {
    if (user?.uid) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.uid,
            showId: user?.uid,
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
      className="btn-outline btn-sm btn gap-2"
      onClick={async () => await createShowReminder()}
    >
      <MdAddAlarm className="h-4 w-4" />
      Remind Me!
    </button>
  );
};

export default RemindMeButton;
