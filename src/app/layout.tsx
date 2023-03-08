/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import logger from "@/lib/util/logging";
import AppWrapper from "@/components/providers/AppWrapper";
import { ThemeProvider } from "@/components/providers";
import { FirebaseAppProvider } from "reactfire";
import AuthProfileProvider from "@/lib/auth/AuthProfileProvider";
import { firebaseConfig } from "@/lib/firebase";

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
        <AppWrapper>
          <PushNotificationWrapper>
            <Toaster />
            <NavBar />
            <main className="flex-1 px-6 pt-4 overflow-y-auto bg-base-200">
              {children}
              <div className="h-16" />
            </main>
          </PushNotificationWrapper>
        </AppWrapper>
      </FirebaseAppProvider>
    </ThemeProvider>
    </body>
    </html>
  );
};
export default RootLayout;
