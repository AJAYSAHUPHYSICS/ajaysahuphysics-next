import type { Metadata } from "next";
import "@fontsource/source-serif-4/500.css";
import "@fontsource/source-serif-4/600.css";
import "@fontsource/source-serif-4/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: "Ajay Sahu Physics | Physics That Makes You Score",
    template: "%s | Ajay Sahu Physics",
  },
  description:
    "Premium physics coaching for JEE Main, JEE Advanced, and NEET aspirants. Chapter-wise notes, formula sheets, daily practice problems, and previous year questions by Ajay Sahu.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "Ajay Sahu Physics | Physics That Makes You Score",
    description:
      "Premium physics coaching for JEE Main, JEE Advanced, and NEET aspirants. Chapter-wise notes, formula sheets, daily practice problems, and previous year questions by Ajay Sahu.",
    url: siteConfig.url,
    siteName: "Ajay Sahu Physics",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ajay Sahu Physics | Physics That Makes You Score",
    description:
      "Premium physics coaching for JEE Main, JEE Advanced, and NEET aspirants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
