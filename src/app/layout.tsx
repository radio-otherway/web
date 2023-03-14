/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Nunito_Sans } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import logger from "@/lib/util/logging";
import AppWrapper from "@/components/providers/AppWrapper";
import { ThemeProvider } from "@/components/providers";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/lib/firebase";

// only initialize when in the browser
const font = Nunito_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
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
                <div className="bg-base-100">
                  <NavBar />
                  <div className="top-0 z-30 flex justify-center w-full h-screen transition-all duration-100 shadow-sm ticky bg-base-100 bg-opacity-90 text-base-content backdrop-blur">
                    <main className="flex-1 px-6 pt-4 overflow-y-auto bg-base-200">
                      {children}
                    </main>
                  </div>
                </div>
              </PushNotificationWrapper>
            </AppWrapper>
          </FirebaseAppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
