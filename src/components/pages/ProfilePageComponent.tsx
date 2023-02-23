"user client";
import React from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { User, Bell } from "react-feather";
import { useAuthUserContext } from "@/lib/auth/authUserContext";

const ProfilePageComponent = () => {
  const { user, loading, logOut } = useAuthUserContext();
  const subNavigation = [
    { name: "Profile", href: "#", icon: User, current: true },
    { name: "Notifications", href: "#", icon: Bell, current: false },
  ];
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <aside className="py-6 lg:col-span-3">
          <nav className="space-y-1">
            {subNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                    : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-teal-500 group-hover:text-teal-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        <form
          className="divide-y divide-gray-200 lg:col-span-9"
          action="#"
          method="POST"
        >
          {/* Profile section */}
          <div className="px-4 py-6 sm:p-6 lg:pb-8">
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="flex flex-col mt-6 lg:flex-row">
              <div className="flex-grow space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
                      workcation.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="flex-grow block w-full min-w-0 border-gray-300 rounded-none rounded-r-md focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      defaultValue={user.handle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>

              <div className="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                <p
                  className="text-sm font-medium text-gray-700"
                  aria-hidden="true"
                >
                  Photo
                </p>
                <div className="mt-1 lg:hidden">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
                      aria-hidden="true"
                    >
                      <img
                        className="w-full h-full rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-5 rounded-md shadow-sm">
                      <div className="relative flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md group focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                        <label
                          htmlFor="mobile-user-photo"
                          className="relative text-sm font-medium leading-4 text-gray-700 pointer-events-none"
                        >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                        </label>
                        <input
                          id="mobile-user-photo"
                          name="user-photo"
                          type="file"
                          className="absolute w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative hidden overflow-hidden rounded-full lg:block">
                  <img
                    className="relative w-40 h-40 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                  <label
                    htmlFor="desktop-user-photo"
                    className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 focus-within:opacity-100 hover:opacity-100"
                  >
                    <span>Change</span>
                    <span className="sr-only"> user photo</span>
                    <input
                      type="file"
                      id="desktop-user-photo"
                      name="user-photo"
                      className="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Privacy section */}
          <div className="pt-6 divide-y divide-gray-200">
            <div className="px-4 sm:px-6">
              <div>
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Privacy
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                </p>
              </div>
              <ul role="list" className="mt-2 divide-y divide-gray-200">
                <Switch.Group
                  as="li"
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex flex-col">
                    <Switch.Label
                      as="p"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Available to hire
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                      lacinia.
                    </Switch.Description>
                  </div>
                  <Switch
                    checked={availableToHire}
                    onChange={setAvailableToHire}
                    className={classNames(
                      availableToHire ? "bg-teal-500" : "bg-gray-200",
                      "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        availableToHire ? "translate-x-5" : "translate-x-0",
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
                <Switch.Group
                  as="li"
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex flex-col">
                    <Switch.Label
                      as="p"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Make account private
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      Pharetra morbi dui mi mattis tellus sollicitudin cursus
                      pharetra.
                    </Switch.Description>
                  </div>
                  <Switch
                    checked={privateAccount}
                    onChange={setPrivateAccount}
                    className={classNames(
                      privateAccount ? "bg-teal-500" : "bg-gray-200",
                      "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        privateAccount ? "translate-x-5" : "translate-x-0",
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
                <Switch.Group
                  as="li"
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex flex-col">
                    <Switch.Label
                      as="p"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Allow commenting
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                    </Switch.Description>
                  </div>
                  <Switch
                    checked={allowCommenting}
                    onChange={setAllowCommenting}
                    className={classNames(
                      allowCommenting ? "bg-teal-500" : "bg-gray-200",
                      "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        allowCommenting ? "translate-x-5" : "translate-x-0",
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
                <Switch.Group
                  as="li"
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex flex-col">
                    <Switch.Label
                      as="p"
                      className="text-sm font-medium text-gray-900"
                      passive
                    >
                      Allow mentions
                    </Switch.Label>
                    <Switch.Description className="text-sm text-gray-500">
                      Adipiscing est venenatis enim molestie commodo eu gravid
                    </Switch.Description>
                  </div>
                  <Switch
                    checked={allowMentions}
                    onChange={setAllowMentions}
                    className={classNames(
                      allowMentions ? "bg-teal-500" : "bg-gray-200",
                      "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        allowMentions ? "translate-x-5" : "translate-x-0",
                        "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </ul>
            </div>
            <div className="flex justify-end px-4 py-4 mt-4 sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
