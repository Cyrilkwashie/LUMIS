import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteDescription =
  "The world's best gadgets. Curated for people who care. Premium phones, laptops, gaming, audio, and more.";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "LUMIS — Technology, Refined",
  description: siteDescription,
  openGraph: {
    title: "LUMIS — Technology, Refined",
    description: siteDescription,
    url: "/",
    siteName: "LUMIS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIS — Technology, Refined",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} overflow-x-hidden antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
