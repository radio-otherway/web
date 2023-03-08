"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import TitleCard from "@/components/widgets/cards/TitleCard";
const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-lg mx-auto ">
      <TitleCard title={pathname === "/login" ? "Login" : "Signup"}>
        <div className="mx-8">{children}</div>
      </TitleCard>
    </div>
  );
};

export default AuthLayout;
