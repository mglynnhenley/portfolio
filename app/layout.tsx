import type { Metadata } from "next";
import { JetBrains_Mono, Anonymous_Pro, Courier_Prime } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  variable: "--font-anonymous-pro",
  weight: ["400", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matilda Glynn-Henley | Investor @ Merantix",
  description: "Pre-seed VC at Merantix Capital investing at the AI Application layer. Previously founded Parlia AI, software engineer, studied CS at Oxford.",
  openGraph: {
    title: "Matilda Glynn-Henley",
    description: "Investor @ Merantix Capital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${anonymousPro.variable} ${courierPrime.variable}`}>
      <body>{children}</body>
    </html>
  );
}
