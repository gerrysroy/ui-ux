import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Arngren Redesign Prototype",
  description: "Clickable UI improvement prototype with original arngren.net images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
