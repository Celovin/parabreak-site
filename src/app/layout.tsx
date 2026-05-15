import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parabreak — The meta engine for Godot",
  description:
    "30 fourth-wall hooks across save manipulation, UI deconstruction, and OS-layer narrative. Built for Godot 4.x. Free Core. Paid Hooks and Plus.",
  metadataBase: new URL("https://parabreak.com"),
  openGraph: {
    title: "Parabreak — The meta engine for Godot",
    description:
      "30 fourth-wall hooks across save manipulation, UI deconstruction, and OS-layer narrative.",
    url: "https://parabreak.com",
    siteName: "Parabreak",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parabreak — The meta engine for Godot",
    description:
      "30 fourth-wall hooks for Godot 4.x. Free Core. Paid Hooks and Plus.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
