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

// Set the theme before first paint: a saved choice wins, otherwise follow the system.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
