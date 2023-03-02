/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { themeChange } from "theme-change";
import Script from "next/script";
import logger from "@/lib/util/logging";
import { Toaster } from "react-hot-toast";
import { LoggingProvider, ThemeProvider } from "@/components/providers";
const LogRocket = require("logrocket");
const setupLogRocketReact = require("logrocket-react");

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
  }, []);

  return (
    <html lang="en">
      <head>
        <Script src="/theme.js" />
      </head>
      <LoggingProvider>
        <body className={`${font.className}`}>
          <ThemeProvider>
            <Toaster />
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
          </ThemeProvider>
        </body>
      </LoggingProvider>
    </html>
  );
};
export default RootLayout;
