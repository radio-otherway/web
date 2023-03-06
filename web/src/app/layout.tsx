/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import logger from "@/lib/util/logging";
import { firebaseConfig } from "@/lib/db";
import OtherwayAppProvider from "@/components/providers/OtherwayAppProvider";
import { ThemeProvider } from "@/components/providers";
import { FirebaseAppProvider } from "reactfire";
import { Theme } from "react-daisyui";
import AuthProfileProvider from "@/lib/auth/AuthProfileProvider";

// only initialize when in the browser
const font = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway"
});

const RootLayout = ({ children }: React.PropsWithChildren) => {
  React.useEffect(() => {
    logger.info("Bootstrapping application");
    // themeChange(false);
  }, []);

  return (
    <html lang="en">
    <head>
      <Script src="/theme.js" />
    </head>
    <body className={`${font.className}`}>
    <ThemeProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <OtherwayAppProvider>
          <AuthProfileProvider>
            <Toaster />
            <PushNotificationWrapper>
              <div className="flex min-h-screen flex-col bg-base-100">
                <NavBar />
                <div className="grow place-items-center items-end bg-base-200 text-base-content">
                  <main className=" text-base-content">{children}</main>
                </div>
              </div>
            </PushNotificationWrapper>
          </AuthProfileProvider>
        </OtherwayAppProvider>
      </FirebaseAppProvider>
    </ThemeProvider>
    </body>
    </html>
  );
};
export default RootLayout;
