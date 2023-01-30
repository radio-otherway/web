import "./globals.css";
import { Inter } from "@next/font/google";
import { NavBar } from "@/components/layout";

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
        <NavBar />
        <div className="-mt-[4rem] px-8 grid h-full  bg-gradient-to-br from-primary to-secondary pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
