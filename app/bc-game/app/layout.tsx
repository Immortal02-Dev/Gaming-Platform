import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// I-define ang font at ituro ang path sa public folder
const avertaStd = localFont({
  src: [
    {
      path: "../public/fonts/avertastd-semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/avertastd-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-averta",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "BC Game",
  description: "A game about blockchain",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${avertaStd.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        <ClientLayout modal={modal}>{children}</ClientLayout>
      </body>
    </html>
  );
}
