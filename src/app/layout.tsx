"use client";
import React from "react";
import "./globals.css";
import { Inter } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { AuthUserProvider } from "@/lib/auth/authUserContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="bumblebee">
    <head />
    <body className={`${inter.className} h-screen`}>
    <AuthUserProvider>
      <div className="min-h-screen w-full bg-base-100 text-base-content m-auto">
        <div className="max-w-7xl flex flex-col min-h-screen mx-auto p-5">
          <Toaster />
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </AuthUserProvider>
    </body>
    </html>
  );
}
