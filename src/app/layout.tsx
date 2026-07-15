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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay Sahu Physics — Physics that makes you score",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Sahu Physics | Physics That Makes You Score",
    description:
      "Premium physics coaching for JEE Main, JEE Advanced, and NEET aspirants.",
    images: ["/og-image.png"],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:font-semibold focus:shadow-lg focus:outline-2 focus:outline-gold"
        >
          Skip to main content
        </a>
        <Analytics />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
