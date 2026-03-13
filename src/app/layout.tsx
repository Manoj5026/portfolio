import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manoj S | Portfolio",
  description: "Personal portfolio and blog — Junior Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen font-sans`}>
        <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-[#dff6ff] to-white transition-colors duration-500" />
        <Navbar />
        <div className="min-h-[80vh] flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
