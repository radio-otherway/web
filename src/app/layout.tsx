/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { themeChange } from "theme-change";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import useLogRocket from "@/lib/util/logging/logRocket";
import logger from "@/lib/util/logging";
import FirestoreProvider from "@/components/providers/FirebaseProvider";

// only initialize when in the browser
const font = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const RootLayout = ({ children }: React.PropsWithChildren) => {
  React.useEffect(() => {
    logger.info("Bootstrapping application");
    themeChange(false);
  }, [logger]);

  return (
    <html lang="en">
      <head>
        <Script src="/theme.js" />
      </head>
      <body className={`${font.className}`}>
        <Toaster />
        <FirestoreProvider>
          <AuthUserProvider>
            <PushNotificationWrapper>
              <div className="flex flex-col min-h-screen bg-base-100">
                <NavBar />
                <div className="items-end grow place-items-center bg-base-200 text-base-content">
                  <main className=" text-base-content">{children}</main>
                </div>
              </div>
            </PushNotificationWrapper>
          </AuthUserProvider>
        </FirestoreProvider>
      </body>
    </html>
  );
};
export default RootLayout;
