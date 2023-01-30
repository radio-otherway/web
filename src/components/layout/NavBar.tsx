import React from "react";
import { BiLogInCircle } from "react-icons/bi";
const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur transition-all duration-100">
      <nav className="navbar w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="btn-ghost drawer-button btn normal-case">
                  Item 1
                </a>
              </li>
              <li>
                <a className="btn-ghost drawer-button btn normal-case">
                  Item 3
                </a>
              </li>
            </ul>
          </div>
          <a className="btn-ghost btn text-xl normal-case">Radio::Otherway</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Coming Up</a>
            </li>
            <li>
              <a>Subscribe</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn gap-4">
            <BiLogInCircle className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6" />
            <span>Login</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
