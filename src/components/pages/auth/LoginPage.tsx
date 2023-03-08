"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import useFirebaseAuth from "@/lib/auth/signin";
import {
  FacebookButton,
  GoogleButton,
  TwitterButton,
} from "@/components/widgets/buttons/social";
import Link from "next/link";
import { InputText } from "@/components/widgets/inputs";
import { ErrorText } from "@/components/widgets";
import TitleCard from "@/components/widgets/cards/TitleCard";
import { Mail } from "react-feather";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgot, setForgot] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signIn,
    getUserProfile,
    checkUserOnboarding,
  } = useFirebaseAuth();
  const login = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    setError("");
    try {
      const result = await signIn(email, password);
      if (result && result.user) {
        router.push("/");
      } else {
        setError("Unable to log you in, please check your email & password");
      }
    } catch (err) {
      setError("Unable to log you in, please check your email & password");
    }
  };
  return (
    <>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700">Sign in with</p>

        <div className="grid grid-cols-3 gap-3 mt-1">
          <TwitterButton onClick={signInWithTwitter} />
          <GoogleButton onClick={signInWithGoogle} />
          <FacebookButton onClick={signInWithFacebook} />
        </div>

        <div className="relative my-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Or continue with
            </span>
          </div>
        </div>
        <form action="#" autoComplete="off">
          <div className="flex flex-col mb-2">
            <div className="relative flex ">
              <span className="inline-flex items-center px-3 text-sm border-t border-b border-l shadow-sm rounded-l-md border-base-300">
                <Mail className="w-4 h-4" fill="currentColor" />
              </span>
              <input
                type="text"
                title="email"
                id="sign-in-email"
                className="flex-1 w-full px-4 py-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none text-base-200 focus:outline-none focus:ring-0 focus:ring-offset-0"
                placeholder="Your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="relative flex ">
              <span className="inline-flex items-center px-3 text-sm border-t border-b border-l shadow-sm rounded-l-md border-base-300">
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                </svg>
              </span>
              <input
                type="password"
                id="password"
                className="flex-1 w-full px-4 py-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none text-base-200 focus:outline-none focus:ring-0 focus:ring-offset-0"
                placeholder="Your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center mb-6 -mt-4">
            <div className="flex ml-auto">
              <a href="#" className="inline-flex text-xs font-thin sm:text-sm">
                Forgot Your Password?
              </a>
            </div>
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="w-full px-4 py-2 text-base font-semibold text-center transition duration-200 ease-in rounded-lg shadow-md btn-primary btn focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center mt-6">
        <Link
          href="/signup"
          className="inline-flex items-center text-xs font-thin text-center "
        >
          <span className="ml-2">You don&apos;t have an account?</span>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
