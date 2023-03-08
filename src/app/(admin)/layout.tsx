"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import Loading from "@/app/loading";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const { status, data: signInCheckResult } = useSigninCheck({
    requiredClaims: { admin: true },
  });

  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && !signInCheckResult.hasRequiredClaims) {
      return router.push("/");
    }
  }, [status, signInCheckResult, router]);
  if (status === "loading") {
    return <Loading />;
  }

  if (signInCheckResult.signedIn && signInCheckResult.hasRequiredClaims) {
    return { children };
  } else {
    return <div>Broken</div>;
  }
};

export default AuthLayout;
