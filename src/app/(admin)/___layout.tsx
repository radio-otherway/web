"use client";
import * as React from 'react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import Loading from "@/app/loading";
const AuthLayout = ({ children }: React.PropsWithChildren) => {
  // const { status, data: signInCheckResult } = useSigninCheck();
  // const router = useRouter();
  // useEffect(() => {
  //   if (status !== "loading" && !signInCheckResult.signedIn) {
  //     return router.push("/");
  //   }
  // }, [status, signInCheckResult, router]);
  // if (status === "loading") {
  //   return <Loading />;
  // }
  return { children };
};

export default AuthLayout;
