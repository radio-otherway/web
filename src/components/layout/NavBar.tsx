"use client";
import {signOut, useSession} from "next-auth/react";
import React from "react";
import {BiLogInCircle} from "react-icons/bi";
import Link from "next/link";

const Navbar = () => {
  const {data: session, status} = useSession();
  return (
    <div
      className="sticky top-0 z-30 flex justify-center w-full h-16 transition-all duration-100 shadow-sm bg-base-100 bg-opacity-90 text-base-content backdrop-blur">
      <nav className="w-full navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow dropdown-content menu rounded-box menu-compact w-52 bg-base-100"
            >
              <li>
                <a className="normal-case btn-ghost drawer-button btn">
                  Item 1
                </a>
              </li>
              <li>
                <a className="normal-case btn-ghost drawer-button btn">
                  Item 3
                </a>
              </li>
            </ul>
          </div>
          <a className="text-xl normal-case btn-ghost btn">Radio::Otherway</a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            <li>
              <a>Coming Up</a>
            </li>
            <li>
              <a>Subscribe</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {status === "authenticated" ? (
            <button className="gap-4 btn" onClick={() => signOut()}>
              <BiLogInCircle className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"/>
              <span>Logout</span>
            </button>
          ) : (
            <Link className="gap-4 btn" href="/login">
              <BiLogInCircle className="inline-block w-5 h-5 stroke-current md:h-6 md:w-6"/>
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
