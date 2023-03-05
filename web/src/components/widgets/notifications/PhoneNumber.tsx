import React from "react";
import "react-phone-number-input/style.css";
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
      className="input-bordered input w-full"
      defaultCountry="IE"
      placeholder="Enter phone number"
      control={control}
    />
  );
};
export default PhoneNumberNotificationControl;
