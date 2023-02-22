"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {BsFacebook, BsGoogle, BsTwitter} from "react-icons/bs";
import useFirebaseAuth from "@/lib/auth/useFirebaseAuth";

const LoginPage = () => {
  const {signInWithGoogle, signInWithTwitter, signInWithFacebook} = useFirebaseAuth();
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 mx-auto">
          Login to Radio Otherway
        </h1>
        <div className="bg-white shadow w-full rounded-lg">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
            <button type="button"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or login with</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="p-5">
            <div className="btn-group w-full">
              <button type="button"
                      className="btn gap-2"
                      onClick={signInWithGoogle}
              >
                <BsGoogle className="h-6 w-6"/>
                Google
              </button>
              <button type="button"
                      className="btn gap-2"
                      onClick={signInWithTwitter}>
                <BsTwitter className="h-6 w-6"/>
                Twitter
              </button>
              <button type="button"
                      className="btn gap-2"
                      onClick={signInWithFacebook}>
                <BsFacebook className="h-6 w-6"/>
                Facebook
              </button>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                       className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
