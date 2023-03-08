import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { BsPersonFillAdd } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, ButtonLink } from "@/components/salient/Button";
import { Container } from "@/components/salient/Container";
import { Logo } from "@/components/salient/Logo";
import { ThemeSelector } from "../widgets/ui/themes";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { CgProfile } from "react-icons/cg";
import { BiLogInCircle, BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ProfileDropdown } from "../widgets/dropdowns";
import { RiLoginCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { GrUser, GrUserNew, GrUserSettings } from "react-icons/gr";
import { useAuthContext } from "@/components/providers/AuthContext";

const MobileNavigation = () => {
  const auth = useAuth();

  const pathname = usePathname();
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
            <span className="sr-only">Toggle Navigation</span>
            <GiHamburgerMenu className="h-3.5 w-3.5 overflow-visible stroke-slate-700" />
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="ul"
                className="absolute inset-x-0 p-6 mt-4 space-y-4 text-lg tracking-tight origin-top bg-white shadow-xl top-full rounded-2xl text-slate-900 ring-1 ring-slate-900/5"
              >
                <li>
                  <Link
                    href="/upcoming"
                    className={clsx(
                      "block w-full",
                      pathname == "/upcoming" ? "border-b-4" : ""
                    )}
                    onClick={() => close()}
                  >
                    Upcoming shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/previous"
                    className={clsx(
                      "block w-full",
                      pathname == "/previous" ? "border-b-4" : ""
                    )}
                    onClick={() => close()}
                  >
                    Previous shows
                  </Link>
                </li>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};

const NavBar = () => {
  const { status, profile, isLoggedIn } = useAuthContext();
  return (
    <nav className="relative flex items-center justify-between px-4 py-4 bg-white">
      <Link className="text-3xl font-bold leading-none" href="/">
        <span className="sr-only">Home</span>
        <Logo className="w-auto h-10" />
      </Link>
      <ul className="absolute hidden transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 lg:mx-auto lg:flex lg:w-auto lg:items-center lg:space-x-6">
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Home
          </a>
        </li>
        <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Contact
          </a>
        </li>
      </ul>
      <div className="flex items-center space-x-5">
        {status !== "loading" && isLoggedIn ? (
          <>
            <Link
              className="flex text-gray-600 transition-colors duration-300 cursor-pointer hover:text-blue-500"
              href="/profile"
            >
              <GrUserSettings className="mr-2 mt-0.5 h-5 w-5 fill-current" />
              Profile
            </Link>
            <Link
              className="flex text-gray-600 transition-colors duration-300 cursor-pointer hover:text-blue-500"
              href="signOut()"
            >
              <RiLogoutCircleLine className="mr-2 mt-0.5 h-5 w-5 fill-current" />
              Logout
            </Link>
            {profile && <ProfileDropdown profile={profile} />}
          </>
        ) : (
          <>
            <Link
              className="flex text-gray-600 transition-colors duration-300 cursor-pointer hover:text-blue-500"
              href="/signin"
            >
              <GrUserNew className="mr-2 mt-0.5 h-5 w-5 fill-current" />
              Sign Up
            </Link>
            <Link
              className="flex text-gray-600 transition-colors duration-300 cursor-pointer hover:text-blue-500"
              href="/login"
            >
              <RiLoginCircleLine className="mr-2 mt-0.5 h-5 w-5 fill-current" />
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
