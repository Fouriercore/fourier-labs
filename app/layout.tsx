import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const displayFont = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

/**
 * Global application SEO and OpenGraph metadata configuration.
 */
export const metadata: Metadata = {
  title: "Fourier | Soroban Smart Contract Reputation Platform",
  description: "Identify malicious or suspicious Soroban smart contracts before signing blockchain transactions. Scan addresses for rug pulls, phishing, and exploits.",
  keywords: ["stellar", "soroban", "smart contracts", "blockchain security", "reputation engine", "threat intelligence"],
  authors: [{ name: "Fouriercore" }],
  openGraph: {
    title: "Fourier | Soroban Smart Contract Reputation Platform",
    description: "Identify malicious or suspicious Soroban smart contracts before signing transactions.",
    url: "https://fourier.fouriercore.org",
    siteName: "Fourier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fourier | Soroban Smart Contract Reputation Platform",
    description: "Inspect contracts before you sign. Open-source transaction security for Stellar Soroban.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} dark`}>
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 w-full relative">
          {/* Subtle background scanline overlay */}
          <div className="absolute inset-0 scan-line opacity-10 pointer-events-none" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
