import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import DotBackground from "@/components/DotBackground";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${jetbrainsMono.variable} ${dmSans.variable}`}>
      <body className="relative">
        <DotBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
