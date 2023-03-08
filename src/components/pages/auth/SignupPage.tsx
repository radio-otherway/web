"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { Info } from "react-feather";
import useFirebaseAuth from "@/lib/auth/firebase";
import {
  FacebookButton,
  GoogleButton,
  TwitterButton,
} from "@/components/widgets/buttons/social";
import ToastService from "@/components/widgets/toast";
import { validateEmail } from "@/lib/util/validationUtils";

const SignupPage = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter, signUp } =
    useFirebaseAuth();
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const register = async (
    $event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    setError("");
    $event.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const result = await signUp(email, password);
    if (result === "") {
      setError("");
      ToastService.success("Account successfully created");
      router.push("/");
    } else if (result === "auth/email-already-in-use") {
      // setError("");
      setError(
        "This email address has already been used to create an account."
      );
    } else if (result === "auth/invalid-email") {
      setError("Please enter a correct email address");
    } else {
      setError("Unable to create an account for you at this time");
    }
  };
  return (
    <>
      {error && (
        <div className="mb-4 shadow-lg alert alert-error">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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
            <TwitterButton onClick={signInWithTwitter} />
            <GoogleButton onClick={signInWithGoogle} />
            <FacebookButton onClick={signInWithFacebook} />
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
