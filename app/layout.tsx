import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matilda Glynn-Henley",
  description: "Building long-horizon evals and benchmarks grounded in real-world data. Previously founded Parlia AI and worked as a software engineer. CS at Oxford, based in San Francisco.",
  openGraph: {
    title: "Matilda Glynn-Henley",
    description: "Building things in San Francisco",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
