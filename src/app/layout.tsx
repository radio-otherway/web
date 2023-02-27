"use client";
import React from "react";
import { themeChange } from "theme-change";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { Toaster } from "react-hot-toast";

const font = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <html lang="en">
      <head />
      <body className={`${font.className}`}>
        <Toaster />
        <AuthUserProvider>
          <div className="flex flex-col min-h-screen bg-base-100">
            <div className="sticky top-0 z-30 flex justify-center flex-none w-full h-16 transition-all duration-100 bg-opacity-90 text-primary-content backdrop-blur">
              <NavBar />
            </div>
            <div className="-mt-[4rem] grow place-items-center items-end bg-gradient-to-br from-primary to-secondary pt-20 text-primary-content ">
              <main className="text-base-content">{children}</main>
            </div>
          </div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
