"use client";
import React from 'react';
import "./globals.css";
import {Inter} from "@next/font/google";
import {NavBar} from "@/components/layout";
import {AuthUserProvider} from "@/lib/auth/authUserContext";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="bumblebee">
    <head/>
    <body className={`${inter.className} h-screen`}>
    <AuthUserProvider>
      <NavBar/>
      <div className="-mt-[4rem]">
        {children}
      </div>
    </AuthUserProvider>
    </body>
    </html>
  );
}
