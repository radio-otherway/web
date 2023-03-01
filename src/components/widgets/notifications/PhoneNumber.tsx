import React from "react";
import "react-phone-number-input/style.css";
import { Control, UseFormRegister } from "react-hook-form";
import { ProfileForm } from "@/components/pages/profile/ProfilePageComponent";
import { DefaultFormValues } from "react-phone-number-input/react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";

interface IPhoneNumberNotificationControlProps {
  name: string;
  control: any;
}
const PhoneNumberNotificationControl = ({
  name,
  control,
}: IPhoneNumberNotificationControlProps) => {
  return (
    <PhoneInputWithCountry
      name={name}
      className="w-full input-bordered input"
      defaultCountry="IE"
      placeholder="Enter phone number"
      control={control}
    />
  );
};
export default PhoneNumberNotificationControl;
