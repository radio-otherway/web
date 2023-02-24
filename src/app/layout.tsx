"use client";
import React from "react";
import { themeChange } from "theme-change";
import "./globals.css";
import { Inter } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <AuthUserProvider>
          <div className="w-full min-h-screen m-auto bg-base-100 text-base-content">
            <div className="flex flex-col min-h-screen p-5 mx-auto max-w-7xl">
              <Toaster />
              <NavBar />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
