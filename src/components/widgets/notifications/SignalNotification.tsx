import React from "react";
import { InputText } from "../inputs";

interface ISignalNotificationProps {
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
}
const SignalNotification = ({
  phoneNumber,
  setPhoneNumber,
}: ISignalNotificationProps) => {
  return (
    <InputText
      showLabel={false}
      type="tel"
      value="phoneNumber"
      labelTitle="Phone number"
      updateFormValue={(value) => setPhoneNumber(value)}
      id="phone"
    />
  );
};
export default SignalNotification;
