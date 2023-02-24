"use client";
import React from "react";
import { BiLogInCircle } from "react-icons/bi";
import Link from "next/link";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import { useAuthUserContext } from "@/lib/auth/authUserContext";
import Image from "next/image";
import { LogIn, LogOut, PlusSquare, Menu, User } from "react-feather";
import dynamic from "next/dynamic";
import Signup from "@/app/(auth)/signup/page";

const ThemeToggle = dynamic(
  () => import("@/components/widgets/ui/theme/ThemeToggle"),
  {
    ssr: false
  }
);
const Navbar = () => {
  const { profile, loading, logOut } = useAuthUserContext();
  const NavMenu = profile ? (
    <React.Fragment>
      <Link
        href="/profile"
        id="profile"
        className="font-normal normal-case font-body btn-primary btn-sm btn"
      >
        <User size={12} className="mr-2" />
        Profile
      </Link>
      <button
        id="logout-btn"
        className="btn-ghost btn-sm btn"
        onClick={() => logOut()}
      >
        <LogOut size={12} className="mr-2" />
        Logout
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
      <Link href="/login" id="login" className="btn-ghost btn-sm btn">
        <LogIn size={12} className="mr-2" />
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
        {NavMenu}
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
