import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { BsPersonFillAdd } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, ButtonLink } from "@/components/salient/Button";
import { Container } from "@/components/salient/Container";
import { Logo } from "@/components/salient/Logo";
import { ThemeSelector } from "../widgets/ui/themes";
import { useAuth, useUser } from "reactfire";
import { CgProfile } from "react-icons/cg";
import { BiLogInCircle, BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ProfileDropdown } from "../widgets/dropdowns";

const MobileNavigation = () => {
  const auth = useAuth();
  const { status, data: profile } = useUser();
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
  const auth = useAuth();
  const { status, data: profile } = useUser();
  return (
    <header className="py-4">
      <Container>
        <nav className="relative z-50 text-sm bg-base-100">
          <ul className="flex items-center">
            <li>
              <Link href="#">
                <span className="sr-only">Home</span>
                <Logo className="w-auto h-10" />
              </Link>
            </li>
            <li className="hidden ml-12 md:block">
              <Link href="/" className="btn-ghost btn">
                Upcoming Shows
              </Link>
            </li>
            <li className="hidden ml-6 md:block">
              <Link href="/previous" className="btn-ghost btn">
                Previous Shows
              </Link>
            </li>
            <li className="hidden ml-auto md:block">
              <ThemeSelector />
            </li>
            {profile ? (
              <>
                <li className="ml-auto md:ml-8">
                  <ButtonLink href="/profile" className="btn-outline btn-xs">
                    <CgProfile className="mr-2" />
                    <span>Profile</span>
                  </ButtonLink>
                </li>
                <li className="ml-auto md:ml-8">
                  <Button
                    onClick={() => void signOut(auth)}
                    className="btn-outline btn-xs"
                  >
                    <BiLogOut className="mr-2" />
                    <span>Logout</span>
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="ml-auto md:ml-8">
                  <ButtonLink
                    href="/login"
                    className="btn-outline btn-xs btn-success"
                  >
                    <BiLogInCircle className="mr-2" />
                    <span>Login</span>
                  </ButtonLink>
                </li>
                <li className="ml-auto md:ml-8">
                  <ButtonLink
                    href="/signup"
                    className="btn-outline btn-xs btn-success"
                  >
                    <BsPersonFillAdd className="mr-2" />
                    <span>
                      Register<span className="hidden lg:inline"> now</span>
                    </span>
                  </ButtonLink>
                </li>
              </>
            )}
            {profile && (
              <li>
                <ProfileDropdown profile={profile} />
              </li>
            )}
            <li className="ml-5 -mr-1 md:hidden">
              <MobileNavigation />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default NavBar;
