"use client";
import React from "react";
import Image from "next/image";
import { LogIn, LogOut, PlusSquare, Menu, User } from "react-feather";
import { ThemeSelector } from "@/components/widgets/ui/themes";
import Link from "next/link";
import { useAuth, useUser } from "reactfire";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const auth = useAuth();
  const { status, data: profile } = useUser();
  const NavMenu = profile ? (
    <React.Fragment>
      <Link
        href="/profile"
        id="profile"
        className="btn-ghost btn gap-1 normal-case"
      >
        <User
          size={20}
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        />
        Profile
      </Link>
      <button
        tabIndex={0}
        className="btn-ghost btn gap-1 normal-case"
        onClick={() => void signOut(auth)}
      >
        <LogOut
          size={20}
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        />
        <span className="hidden md:inline">Logout</span>
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link
        href="/signup"
        id="signup"
        className="btn-ghost btn gap-1 normal-case"
      >
        <PlusSquare
          size={20}
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        />
        Register
      </Link>
      <Link
        href="/login"
        id="login"
        className="btn-ghost btn gap-1 normal-case"
      >
        <LogIn
          size={20}
          className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
        />
        Login
      </Link>
    </React.Fragment>
  );

  return (
    <nav className="navbar w-full bg-primary text-base-200 shadow-lg">
      <Link href="/">
        <Image src="/logo.png" alt="Otherway" width={42} height={42} />
      </Link>
      <div className="font-body ml-auto hidden flex-col text-center text-sm md:flex md:flex-row">
        {status === "success" && NavMenu}
        <ThemeSelector />
      </div>

      <div className="ml-auto lg:hidden">
        <div className="dropdown-end dropdown" data-cy="dropdown">
          <div tabIndex={0} className="m-1 cursor-pointer">
            <Menu />
          </div>
          <div className="dropdown-content menu mt-3 w-24 space-y-3 text-center">
            {NavMenu}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
