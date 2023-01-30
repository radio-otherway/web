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
    <html lang="en" data-theme="synthwave">
      <head />
      <body className={`${inter.className} h-screen`}>
        <NavBar />
        <div className="-mt-[4rem] grid h-full place-items-center bg-gradient-to-br from-primary to-secondary pt-20 text-primary-content">
          {children}
        </div>
      </body>
    </html>
  );
}
