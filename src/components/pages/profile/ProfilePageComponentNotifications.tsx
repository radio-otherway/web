import React from "react";
import { HeadingSubComponent } from "@/components/widgets/text";
import {
  PhoneNumber,
  RequestPushNotifications,
} from "@/components/widgets/notifications";
import { UseFormRegister } from "react-hook-form";
import { ProfileForm } from "@/components/pages/profile/ProfilePageComponent";
import { Profile } from "@/models";

interface IProfilePageComponentNotificationsProps {
  register: UseFormRegister<ProfileForm>;
  control: any;
  profile: Profile;
}
const ProfilePageComponentNotifications = ({
  register,
  control,
  profile,
}: IProfilePageComponentNotificationsProps) => {
  const [notificationPermissionsGranted, setNotificationPermissionsGranted] =
    React.useState(Notification.permission !== "granted");

  React.useEffect(() => {
    setNotificationPermissionsGranted(Notification.permission !== "granted");
  }, []);

  return (
    <div className="space-y-8 divide-y sm:space-y-5">
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 ">Notifications</h3>
          <p className="max-w-2xl mt-1 text-sm ">
            Here you can setup various different forms of notifications
          </p>
        </div>
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <div className="space-x-3 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Browser Notifications"
              subHeading="We'll send you an alert through (this) browser when a show is about to start."
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg rounded-md shadow-sm">
                {notificationPermissionsGranted ? (
                  <div>Permissions granted</div>
                ) : (
                  <RequestPushNotifications />
                )}
              </div>
            </div>
          </div>
          <div className="space-x-3 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Phone number"
              subHeading="We'll try to send you a WhatsApp message when a show is about to start"
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg rounded-md shadow-sm">
                <PhoneNumber name="mobileNumber" control={control} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponentNotifications;
