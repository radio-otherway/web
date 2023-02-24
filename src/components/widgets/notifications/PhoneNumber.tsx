import React from "react";
import { InputText } from "../inputs";

interface PhoneNumberNotificationControlProps {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
}
const PhoneNumberNotificationControl = ({
  phoneNumber,
  setPhoneNumber,
}: PhoneNumberNotificationControlProps) => {
  return (
    <InputText
      showLabel={false}
      type="tel"
      defaultValue="phoneNumber"
      labelTitle="Phone number"
      updateFormValue={(value) => setPhoneNumber(value)}
      id="phone"
    />
  );
};
export default PhoneNumberNotificationControl;
