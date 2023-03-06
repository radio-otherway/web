"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoLogoFacebook, IoLogoGoogle, IoLogoTwitter } from "react-icons/io";
import useFirebaseAuth from "@/lib/auth/signin";
import { FacebookButton, GoogleButton, TwitterButton } from "@/components/widgets/buttons/social";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [forgot, setForgot] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signIn,
    getUserProfile
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
    <div className="font-body max-w-lg rounded-md bg-base-100 p-10 text-base-content shadow-md md:flex-1">
      <h3 className="font-title my-4 text-2xl font-semibold">Account Login</h3>
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
      <div className="flex flex-col space-y-5">
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
            className="btn-primary btn w-full"
            onClick={(event) => {
              void login(event);
            }}
          >
            Log in
          </button>
        </div>
        <div className="flex flex-col space-y-5">
          <span className="flex items-center justify-center space-x-2">
            <span className="h-px w-14 bg-gray-400" />
            <span className="font-normal text-gray-500">or login with</span>
            <span className="h-px w-14 bg-gray-400" />
          </span>
          <div className="flex items-center justify-center gap-4">
            <TwitterButton onClick={signInWithTwitter} />
            <GoogleButton onClick={signInWithGoogle} />
            <FacebookButton onClick={signInWithFacebook} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
