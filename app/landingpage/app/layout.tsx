import type { Metadata } from "next";

import { HeaderSection } from "@/components/shared/Header";
import { FooterSection } from "@/components/shared/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICON SOLUTION",
  description: "ICON SOLUTION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body>
        <div className="w-full mx-auto sm:px-6 pt-10 max-w-full px-0 lg:px-0">
          <div className="h-20"></div>
          <HeaderSection />
          {children}
          <FooterSection />
        </div>
      </body>
    </html>
  );
}
