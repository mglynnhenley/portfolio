import type { Metadata } from "next";
import { Space_Mono, IBM_Plex_Mono, Fira_Code } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
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
    <html lang="en" className={`${spaceMono.variable} ${ibmPlexMono.variable} ${firaCode.variable}`}>
      <body>{children}</body>
    </html>
  );
}
