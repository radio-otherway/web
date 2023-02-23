"use client";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import { Show } from "@/models";
import React from "react";
import { MdAddAlarm } from "react-icons/md";
import { error, success, warning } from "./toast/toastService";

const RemindMeButton = ({ show }: { show: Show }) => {
  const { user } = useFirebaseAuth();
  const createShowReminder = async () => {
    if (user?.uid) {
      var response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.uid,
            showId: show.id,
          }),
        }
      );
      if (response.status === 201) {
        success("Reminder created successfully");
      } else {
        error("Unable to create reminder at this time");
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
