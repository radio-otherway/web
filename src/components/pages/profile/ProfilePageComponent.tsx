"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User, Bell } from "react-feather";
import classNames from "classnames";
import ProfilePageComponentProfile from "./ProfilePageComponentProfile";
import ProfilePageComponentNotifications from "./ProfilePageComponentNotifications";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastService from "@/components/widgets/toast";
import logger from "@/lib/util/logging";
import { removeUndefinedProperties } from "@/lib/util/objectUtils";
import { AuthProfileContext } from "@/lib/auth/AuthProfileProvider";
import { useUser } from "reactfire";
import Loading from "@/app/loading";
import { Users } from "@/lib/db/collections";

export type ProfileForm = {
  displayName: string;
  email: string;
  about: string;
  photoURL: string;
  headerPhotoURL: string;
  mobileNumber: string;
  notificationsBrowser: boolean;
  notificationsMobile: boolean;
  notificationsWhatsapp: boolean;
  notificationsEmail: boolean;
};

const ProfilePageComponent = ({ page, onboarding }: { page: number, onboarding: boolean }) => {

  const { profile } = useContext(AuthProfileContext);
  const { status, data: user } = useUser();
  const router = useRouter();
  const subNavigation = [
    { name: "profile", title: "Profile", icon: User },
    {
      name: "notifications",
      title: "Notifications",
      icon: Bell
    }
  ];

  const [selectedItem, setSelectedItem] = React.useState(subNavigation[0].name);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors }
  } = useForm<ProfileForm>({
    defaultValues: useMemo(() => {
      return profile;
    }, [profile])
  });

  useEffect(() => {
    setSelectedItem(subNavigation[page].name);
  }, [page]);
  useEffect(() => {
    if (onboarding) {
      ToastService.custom(
        "Welcome to Radio Otherway, if you want to get reminded about upcoming shows please fill in your telephone number on the profile page and choose how you would like to be notified.\nAlso, select Enable Desktop Notifications if you want the browser to give you a buzz.",
        "Welcome Aboard 🚂",
        { duration: Infinity, icon: "👋" }
      );
      onboarding = false;
    }
  }, []);
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);
  const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
    console.log(data);
    try {
      const newProfile = removeUndefinedProperties({
        displayName: data.displayName,
        email: data.email,
        about: data.about,
        photoURL: data.photoURL,
        headerPhotoURL: data.headerPhotoURL,
        mobileNumber: data.mobileNumber,
        lastSeen: new Date(),
        notificationsEmail: data.notificationsEmail,
        notificationsMobile: data.notificationsMobile,
        notificationsWhatsapp: data.notificationsWhatsapp,
        notificationsBrowser: data.notificationsBrowser
      });
      console.log("ProfilePageComponent", "Updating profile", newProfile);
      newProfile.isOnboarded = true;
      if (profile?.id) {
        const result = await Users.set(profile.id, newProfile);
      }
      ToastService.success("Successfully updated your profile", "Success");
    } catch (err) {
      logger.error("ProfilePageComponentProfile", "_submitProfileForm", err);
      ToastService.error("Failed to update your profile.");
    }
  };

  useEffect(() => {
  }, [selectedItem]);
  const _getView = () => {

    return profile ? (
      <div className="pt-4 overflow-hidden">
        <div className="justify-center flex-1 px-2 mx-2 md:flex md:justify-start">
          <span className="text-2xl font-bold">Your Profile</span>
        </div>
        <div className="mt-1 divider" />
        <div className="divide-y lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  onClick={() => setSelectedItem(item.name)}
                  key={item.name}
                  className={classNames(
                    item.name === selectedItem
                      ? "border-teal-600 bg-base-100 text-teal-700  hover:text-teal-700"
                      : "border-transparent  hover:text-base-300",
                    "group flex cursor-pointer items-center border-l-4 px-3 py-2 text-sm font-medium hover:bg-accent"
                  )}
                  aria-current={item.name ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.name === selectedItem
                        ? "text-teal-500 group-hover:text-base-100"
                        : "text-base-content group-hover:text-base-100",
                      "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="p-4 divide-y lg:col-span-9">
            <form onSubmit={handleSubmit(onSubmit)}>
              {selectedItem === "profile" ? (
                <ProfilePageComponentProfile
                  setValue={setValue}
                  register={register}
                  profile={profile}
                />
              ) : (
                <ProfilePageComponentNotifications
                  register={register}
                  control={control}
                  profile={profile}
                />
              )}
              <div className="pt-5">
                <div className="flex justify-end space-x-2">
                  <button type="button" className="btn-warning btn">
                    Cancel
                  </button>
                  <button type="submit" className="btn-success btn">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    ) : <Loading />;
  };
  return _getView();
};
export default ProfilePageComponent;
