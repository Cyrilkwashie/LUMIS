import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import LayoutShell from "@/components/LayoutShell";
import "./globals.css";

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
  title: "LUMIS — Technology, Refined",
  description:
    "The world's best gadgets. Curated for people who care. Premium phones, laptops, gaming, audio, and more.",
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
