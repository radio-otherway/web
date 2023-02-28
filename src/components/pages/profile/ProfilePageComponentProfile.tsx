"use client";
import { InputText } from "@/components/widgets/inputs";
import { HeadingSubComponent } from "@/components/widgets/text";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import db, { users } from "@/lib/db";
import { debug } from "console";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import ToastService from "@/components/widgets/toast";
import logger from "@/lib/util/logging";

const ProfilePageComponentProfile = () => {
  const { loading, profile } = useAuthUserContext();
  const [sendReminders, setSendReminders] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [image, setImage] = React.useState("");
  React.useEffect(() => {
      if (profile) {
      setEmail(profile.email as string);
      setDisplayName(profile.displayName as string);
      setAbout(profile.about as string);
    }
  }, [profile]);
  const _submitProfileForm = async ($event: React.SyntheticEvent) => {
    $event.preventDefault();
    try {
      const result = await setDoc(
        doc(users, profile?.id),
        Object.assign(
          {},
          {
            email,
            displayName,
            about: about || "",
            lastSeen: new Date()
          }
        ),
        { merge: true }
      );
      console.log("ProfilePageComponentProfile", "_submitProfileForm", result);
      ToastService.success("Successfully updated your profile", "Success");
    } catch (err) {
      logger.error("ProfilePageComponentProfile", "_submitProfileForm", err);
      ToastService.error("Failed to update your profile.");
    }
  };
  return (
    <form className="space-y-8 divide-y" onSubmit={_submitProfileForm}>
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
                    id="displayname"
                    type="text"
                    labelTitle="Display name"
                    value={displayName}
                    updateFormValue={(v) => {
                      setDisplayName(v);
                    }}
                    showLabel={false}
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
                    labelTitle="Email address"
                    value={email}
                    updateFormValue={(v) => setEmail(v)}
                    showLabel={false}
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
                <InputText
                  id="about"
                  type="textarea"
                  labelTitle="About"
                  value={about}
                  updateFormValue={(v) => setAbout(v)}
                  showLabel={false}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <HeadingSubComponent
                title="Photo"
                subHeading="Upload a picture to distinguish you from the rest"
              />
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex items-center">
                  <span className="w-12 h-12 overflow-hidden rounded-full">
                    <svg
                      className="w-full h-full "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="px-3 py-2 ml-5 text-sm font-medium leading-4 border rounded-md shadow-sm hover: focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:pt-5">
              <HeadingSubComponent
                title="Cover photo"
                subHeading="Upload a wide photo for the top of your profile page"
              />
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="w-12 h-12 mx-auto "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm ">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium rounded-md cursor-pointer te focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default ProfilePageComponentProfile;
