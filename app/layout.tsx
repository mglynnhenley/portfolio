import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matilda Glynn-Henley",
  description: "Building Sonata Labs, an open-source agent benchmark. Previously founded Parlia AI and worked as a software engineer. CS at Oxford, based in London.",
  openGraph: {
    title: "Matilda Glynn-Henley",
    description: "Building things in London",
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
