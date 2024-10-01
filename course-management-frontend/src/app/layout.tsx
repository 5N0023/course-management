import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Course Management",
  description: "Course Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen font-sans bg-green-500 text-primary-foreground flex flex-col ${geistSans} ${geistMono} `}
      >
        <h2 className="text-2xl font-bold text-secondary text-center m-4 md:text-4xl">
          Course Management
        </h2>
        <Toaster />
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
