"use client";

import "./globals.css";
import { Inter } from "@next/font/google";
import { NavBar } from "@/components/layout";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="bumblebee">
      <head />
      <body className={`${inter.className} h-screen`}>
        <SessionProvider>
          <NavBar />
          <div className="-mt-[4rem] grid h-full bg-gradient-to-br  from-primary to-secondary px-8 pt-20">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
