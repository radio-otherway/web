"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";

const SignupPage = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter, profile, signUp } =
    useFirebaseAuth();
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");


  const register = async (
    $event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    $event.preventDefault();
    const result = await signUp(email, password);
    if (result === "auth/email-already-in-use") {
      setError("This email address has already been used to create an account.");
    } else if (result === "auth/invalid-email") {
      setError("Please enter a correct email address");
    } else {
      setError("Unable to create an account for you at this time");
    }
  };
  return (
    <div className="max-w-lg p-10 rounded-md shadow-md font-body bg-base-100 text-base-content md:flex-1">
      <h3 className="my-4 text-2xl font-semibold font-title">
        Create New Account
      </h3>
      {error && (
        <div className="shadow-lg alert alert-error mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
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
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm">
              Repeat password
            </label>
          </div>
          <input
            type="password"
            id="password"
            className="input-bordered input-primary input input-sm"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="w-full btn-primary btn"
            onClick={(event) => {
              void register(event);
            }}
          >
            Register for Account
          </button>
        </div>

        <div className="flex flex-col space-y-5">
          <span className="flex items-center justify-center space-x-2">
            <span className="h-px bg-gray-400 w-14" />
            <span className="font-normal text-gray-500">or sign up with</span>
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

        </div>
      </form>
    </div>
  );
};

export default SignupPage;
