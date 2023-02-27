"use client";
import React from "react";
import Link from "next/link";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import Image from "next/image";
import { LogIn, LogOut, PlusSquare, Menu, User } from "react-feather";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("@/components/widgets/ui/theme/ThemeToggle"),
  {
    ssr: false,
  }
);
const Navbar = () => {
  const { profile, loading, logOut } = useAuthUserContext();
  const NavMenu = profile ? (
    <React.Fragment>
      <Link
        href="/profile"
        id="profile"
        className="gap-1 normal-case btn-ghost btn"
      >
        <User
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        Profile
      </Link>
      <button
        tabIndex={0}
        className="gap-1 normal-case btn-ghost btn"
        onClick={() => logOut()}
      >
        <LogOut
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        <span className="hidden md:inline">Logout</span>
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link
        href="/signup"
        id="signup"
        className="font-normal normal-case font-body btn-primary btn-sm btn text-primary-content"
      >
        <PlusSquare size={12} className="mr-2" />
        Register
      </Link>
      <Link
        href="/login"
        id="login"
        className="gap-1 normal-case btn-ghost btn"
      >
        <LogIn
          size={20}
          className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"
        />
        Login
      </Link>
    </React.Fragment>
  );

  return (
    <nav className="w-full mb-2 navbar">
      <Link href="/">
        <Image src="/logo.png" alt="Otherway" width={48} height={48} />
      </Link>
      <div className="flex-col hidden ml-auto text-sm text-center font-body md:flex md:flex-row md:space-x-10">
        {!loading && NavMenu}
      </div>
      <ThemeToggle />

      <div className="ml-auto lg:hidden">
        <div className="dropdown-end dropdown" data-cy="dropdown">
          <div tabIndex={0} className="m-1 cursor-pointer">
            <Menu />
          </div>
          <div className="w-24 mt-3 space-y-3 text-center dropdown-content menu">
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
