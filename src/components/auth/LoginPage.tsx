"use client";
import React from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginPage = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center w-1/2 place-items-center bg-base-200">
      <div className="px-10 py-24">
        <h2 className="mb-2 text-2xl font-semibold text-center">Login </h2>

        <div key="{provider.name}">
          <button onClick={() => signIn("google").then(r => router.push('/'))}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
