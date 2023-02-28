"use client";
import React from "react";
import "./globals.css";
import { Raleway } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { Toaster } from "react-hot-toast";
import { defaults } from "@/lib/constants";

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
    const theme = localStorage.getItem("theme") || defaults.defaultTheme;
    if (theme && !document.body.dataset.theme) {
      document.body.dataset.theme = theme;
    }
  }, []);
  return (
    <html lang="en">
      <head />
      <body className={`${font.className}`}>
        <Toaster />
        <AuthUserProvider>
          <div className="flex flex-col min-h-screen bg-base-100">
            <NavBar />
            <div className="items-end grow place-items-center bg-base-200 text-primary-content">
              <main className=" text-base-content">{children}</main>
            </div>
          </div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
