"use client";
import { ProfilePageComponent } from "@/components/pages/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import Loading from "../loading";

const ProfilePage = ({
  params,
  searchParams,
}: {
  params?: { page: number };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading" && !signInCheckResult.signedIn) {
      return router.push("/");
    }
  }, [status, signInCheckResult, router]);
  if (status === "loading") {
    return <Loading />;
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <ProfilePageComponent
        page={
          searchParams && searchParams["page"]
            ? Number(searchParams["page"])
            : 0
        }
        onboarding={
          (searchParams && searchParams["onboarding"] === "1") || false
        }
      />
    );
  } else {
    <div>Waiting...</div>;
  }
};

export default ProfilePage;
