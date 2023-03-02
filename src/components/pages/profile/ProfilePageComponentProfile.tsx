"use client";
import { HeadingSubComponent } from "@/components/widgets/text";
import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileForm } from "@/components/pages/profile/ProfilePageComponent";
import { Profile } from "@/models";
import { FirebaseImageUpload, InputText } from "@/components/widgets/inputs";
import { InputTextArea } from "@/components/widgets/inputs";

interface IProfilePageComponentProfileProps {
  profile: Profile;
  register: UseFormRegister<ProfileForm>;
  setValue: UseFormSetValue<ProfileForm>;
}
const ProfilePageComponentProfile = ({
  profile,
  register,
  setValue,
}: IProfilePageComponentProfileProps) => {
  const [photoURLFile, setPhotoURLFile] = useState("");
  return (
    <div className="space-y-8 divide-y sm:space-y-5">
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 ">Profile</h3>
          <p className="max-w-2xl mt-1 text-sm ">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <div className="space-x-3 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Display Name"
              subHeading="The name you would like others to see you as."
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg rounded-md shadow-sm">
                <InputText
                  id="displayName"
                  type="text"
                  label="Display name"
                  {...register("displayName")}
                />
              </div>
            </div>
          </div>
          <div className="space-x-3 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Email address"
              subHeading="In case we need to get in touch with you"
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <div className="flex max-w-lg rounded-md shadow-sm">
                <InputText
                  id="email"
                  type="email"
                  label="Email address"
                  showLabel={false}
                  {...register("email")}
                />
              </div>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="About"
              subHeading="Tell us a little bit about yourself.. but not too much"
            />

            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <InputTextArea
                id="about"
                type="textarea"
                label="About"
                showLabel={false}
                {...register("about")}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Photo"
              subHeading="Upload a picture to distinguish you from the rest"
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <FirebaseImageUpload
                forType="user"
                imageType="avatar"
                itemId={profile.id}
                imageUrl={profile.photoURL}
                controlName="photoURL"
                setValue={setValue}
                {...register("photoURL")}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
            <HeadingSubComponent
              title="Cover photo"
              subHeading="Upload a wide photo for the top of your profile page"
            />
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <FirebaseImageUpload
                forType="user"
                imageType="profile"
                itemId={profile.id}
                imageUrl={profile.headerPhotoURL}
                controlName="headerPhotoURL"
                setValue={setValue}
                {...register("headerPhotoURL")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponentProfile;
