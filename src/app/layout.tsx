"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { themeChange } from "theme-change";

const font = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway"
});

export default function RootLayout({
                                     children
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
    <AuthUserProvider>
      <PushNotificationWrapper>
        <div className="flex flex-col min-h-screen bg-base-100">
          <NavBar />
          <div className="items-end grow place-items-center bg-base-200 text-primary-content">
            <main className=" text-base-content">{children}</main>
          </div>
        </div>
      </PushNotificationWrapper>
    </AuthUserProvider>
    </body>
    </html>
  );
}
