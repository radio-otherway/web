import { getAuth, signOut, User } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { useFirebaseApp } from "reactfire";
import { Profile } from "@/models";

const ProfileDropdown = ({ profile }: { profile: Profile }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return (
    <div className="ml-4 dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          {profile.photoURL && (
            <Image
              src={profile.photoURL}
              alt="profile"
              width={64}
              height={64}
            />
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="p-2 mt-3 shadow dropdown-content menu rounded-box menu-compact w-52 bg-base-100"
      >
        <li className="justify-between">
          <Link href={"/profile"}>Profile Settings</Link>
        </li>
        <li className="">
          <Link href={"/debug"}>Debug</Link>
        </li>
        <li className="">
          <Link href={"/scheduler"}>Scheduler</Link>
        </li>
        <div className="mt-0 mb-0 divider"></div>
        <li>
          <a onClick={() => signOut(auth)}>Logout</a>
        </li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
