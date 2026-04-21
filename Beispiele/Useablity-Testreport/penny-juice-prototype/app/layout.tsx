import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/app/components/nav-bar";

export const metadata: Metadata = {
  title: "Penny Juice UX Prototype",
  description: "Clickable Next.js prototype with UX recommendation updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-emerald-50/40 text-black">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
