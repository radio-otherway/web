/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar, PushNotificationWrapper } from "@/components/layout";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import logger from "@/lib/util/logging";
import OtherwayAppProvider from "@/components/providers/OtherwayAppProvider";
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
        <OtherwayAppProvider>
          <AuthProfileProvider>
            <PushNotificationWrapper>
              <Toaster />
              <NavBar />
              <main className="flex-1 px-6 pt-4 overflow-y-auto bg-base-200">
                {children}
                <div className="h-16" />
              </main>
              {/* <div className="flex-1 px-6 pt-8 overflow-y-auto">
                      <div className="hero h-4/5 ">
                        <div className="hero-content">{children}</div>
                      </div>
                    </div> */}
              {/* <div className="items-end grow place-items-center bg-base-200 text-base-content">
                      <main className="flex-col justify-between w-full col-start-1 row-start-1 gap-10 pb-40 hero-content max-w-7xl lg:flex-row lg:items-end lg:gap-0 xl:gap-20">
                        {children}
                      </main>
                    </div> */}
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
