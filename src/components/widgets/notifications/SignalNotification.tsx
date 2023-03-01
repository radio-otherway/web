import React from "react";
import InputText from "../inputs/InputText";
import { UseFormRegister } from "react-hook-form";
import { ProfileForm } from "@/components/pages/profile/ProfilePageComponent";
import { Profile } from "@/models";

interface ISignalNotificationProps {
  register: UseFormRegister<ProfileForm>;
  profile: Profile;
}
const SignalNotification = ({
  register,
  profile,
}: ISignalNotificationProps) => {
  return (
    <div>
      {/* <InputText
        id="signalNotification"
        showLabel={false}
        type="tel"
        {...register('signalNotification')}
      /> */}
    </div>
  );
};
export default SignalNotification;
