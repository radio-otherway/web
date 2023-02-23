"use client";
import React from "react";
import "./globals.css";
import { Inter } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
// const Toaster = dynamic(
//   () => import("react-hot-toast").then((c) => c.Toaster),
//   {
//     ssr: false,
//   }
// );
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="bumblebee">
      <head />
      <body className={`${inter.className} h-screen`}>
        <AuthUserProvider>
          <Toaster />
          <NavBar />
          <div className="-mt-[4rem]">{children}</div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
