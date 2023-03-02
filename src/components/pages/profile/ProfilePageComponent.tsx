"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User, Bell } from "react-feather";
import classNames from "classnames";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import ProfilePageComponentProfile from "./ProfilePageComponentProfile";
import ProfilePageComponentNotifications from "./ProfilePageComponentNotifications";
import { SubmitHandler, useForm } from "react-hook-form";
import { users } from "@/lib/db";
import { doc, setDoc } from "firebase/firestore";
import ToastService from "@/components/widgets/toast";
import logger from "@/lib/util/logging";
import { removeUndefinedProperties } from "@/lib/util/objectUtils";

export type ProfileForm = {
  displayName: string;
  email: string;
  about: string;
  photoURL: string;
  headerPhotoURL: string;
  mobileNumber: string;
};

const ProfilePageComponent = () => {
  const { profile, loading } = useAuthUserContext();
  const router = useRouter();
  React.useEffect(() => {
    if (!loading && !profile) {
      router.push("/");
    }
  }, [profile, loading, router]);
  const subNavigation = [
    { name: "profile", title: "Profile", icon: User },
    {
      name: "notifications",
      title: "Notifications",
      icon: Bell,
    },
  ];
  const [selectedItem, setSelectedItem] = React.useState("profile");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: useMemo(() => {
      return profile;
    }, [profile]),
  });

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
      });
      const result = await setDoc(
        doc(users, profile?.id),
        Object.assign({}, newProfile),
        {
          merge: true,
        }
      );
      console.log("ProfilePageComponentProfile", "_submitProfileForm", result);
      ToastService.success("Successfully updated your profile", "Success");
    } catch (err) {
      logger.error("ProfilePageComponentProfile", "_submitProfileForm", err);
      ToastService.error("Failed to update your profile.");
    }
  };

  useEffect(() => {}, [selectedItem]);
  const _getView = () => {
    if (loading) {
      return <div>Loading</div>;
    } else if (!loading && !profile) {
      return <div>Rerouting</div>;
    } else if (!loading && profile) {
      return (
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
      );
    } else {
      return (
        <div>
          <h1>This is weird</h1>
        </div>
      );
    }
  };
  return _getView();
};
export default ProfilePageComponent;
