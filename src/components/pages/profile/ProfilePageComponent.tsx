"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { User, Bell } from "react-feather";
import classNames from "classnames";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import ProfilePageComponentProfile from "./ProfilePageComponentProfile";
import ProfilePageComponentNotifications from "./ProfilePageComponentNotifications";

const ProfilePageComponent = () => {
  const { profile, loading } = useAuthUserContext();
  const router = useRouter();
  React.useEffect(() => {
    if (!loading && !profile) {
      router.push("/");
    }
  }, [profile, loading, router]);
  const [sendReminders, setSendReminders] = React.useState(false);
  const subNavigation = [
    { name: "profile", title: "Profile", icon: User },
    {
      name: "notifications",
      title: "Notifications",
      icon: Bell,
    },
  ];
  const [selectedItem, setSelectedItem] = React.useState("profile");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {}, [selectedItem]);
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
              {selectedItem === "profile" ? (
                <ProfilePageComponentProfile />
              ) : (
                <ProfilePageComponentNotifications />
              )}
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
