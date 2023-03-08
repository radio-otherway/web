import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { BsPersonFillAdd } from "react-icons/bs";
import { Button, ButtonLink } from "@/components/salient/Button";
import { Container } from "@/components/salient/Container";
import { Logo } from "@/components/salient/Logo";
import { ThemeSelector } from "../widgets/ui/themes";
import { useAuth, useUser } from "reactfire";
import { CgProfile } from "react-icons/cg";
import { BiLogInCircle, BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";

const MobileNavigation = () => {
  const auth = useAuth();
  const { status, data: profile } = useUser();
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
            <span className="sr-only">Toggle Navigation</span>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": open,
                })}
              />
              <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": !open,
                })}
              />
            </svg>
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
                className="absolute inset-x-0 top-full mt-4 origin-top space-y-4 rounded-2xl bg-white p-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
              >
                <li>
                  <Link
                    href="/"
                    className="block w-full"
                    onClick={() => close()}
                  >
                    Upcoming shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/previous"
                    className="block w-full"
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
        <nav className="relative z-50 bg-base-100 text-sm">
          <ul className="flex items-center">
            <li>
              <Link href="#">
                <span className="sr-only">Home</span>
                <Logo className="h-10 w-auto" />
              </Link>
            </li>
            <li className="ml-12 hidden md:block">
              <Link href="/" className="btn-ghost btn">
                Upcoming Shows
              </Link>
            </li>
            <li className="ml-6 hidden md:block">
              <Link href="/previous" className="btn-ghost btn">
                Previous Shows
              </Link>
            </li>
            <li className="ml-auto hidden md:block">
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
                    className="btn-outline btn-info btn-sm"
                  >
                    <BiLogInCircle className="mr-2" />
                    <span>Login</span>
                  </ButtonLink>
                </li>
                <li className="ml-auto md:ml-8">
                  <ButtonLink
                    href="/signup"
                    className="btn-outline btn-info btn-sm"
                  >
                    <BsPersonFillAdd className="mr-2" />
                    <span>
                      Register<span className="hidden lg:inline"> now</span>
                    </span>
                  </ButtonLink>
                </li>
              </>
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
