"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";

const LoginPage = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter, profile, signIn } =
    useFirebaseAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [forgot, setForgot] = React.useState(false);

  const login = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    const result = await signIn(email, password);
  };
  return (
    <div className="max-w-lg p-10 rounded-md shadow-md font-body bg-base-100 text-base-content md:flex-1">
      <>
        <h3 className="my-4 text-2xl font-semibold font-title">
          Account Login
        </h3>
        <form action="#" className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoFocus
              className="input-bordered input-primary input input-sm"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgot(true);
                }}
                className="text-sm text-blue-600 hover:underline focus:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              className="input-bordered input-primary input input-sm"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="w-full btn-primary btn"
              onClick={(event) => {
                void login(event);
              }}
            >
              Log in
            </button>
          </div>
          <div className="flex flex-col space-y-5">
            <span className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-400 w-14" />
              <span className="font-normal text-gray-500">or login with</span>
              <span className="h-px bg-gray-400 w-14" />
            </span>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="w-1/3 gap-2 btn"
                onClick={signInWithTwitter}
              >
                <div className="text-base-content">
                  <IoLogoTwitter />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Twitter
                </span>
              </button>
              <button
                type="button"
                className="w-1/3 gap-2 btn"
                onClick={signInWithGoogle}
              >
                <div className="text-base-content">
                  <IoLogoGoogle />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Gmail
                </span>
              </button>
              <button
                type="button"
                className="w-1/3 gap-2 btn"
                onClick={signInWithFacebook}
              >
                <div className="text-base-content">
                  <IoLogoFacebook />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Facebook
                </span>
              </button>
            </div>
            {/* <div className="flex flex-row space-x-1">
              <button
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border rounded-md group border-base-200 hover:bg-base-300 focus:outline-none"
                onClick={signInWithTwitter}
              >
                <div className="text-base-content">
                  <IoLogoTwitter />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Twitter
                </span>
              </button>
              <button
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border rounded-md group border-base-200 hover:bg-base-300 focus:outline-none"
                onClick={signInWithGoogle}
              >
                <div className="text-base-content">
                  <IoLogoGoogle />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Gmail
                </span>
              </button>
              <button
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border rounded-md group border-base-200 hover:bg-base-300 focus:outline-none"
                onClick={signInWithFacebook}
              >
                <div className="text-base-content">
                  <IoLogoFacebook />
                </div>
                <span className="text-sm font-medium text-base-content">
                  Facebook
                </span>
              </button>
            </div> */}
          </div>
        </form>
      </>
    </div>
  );
};

export default LoginPage;
