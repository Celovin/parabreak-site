import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "parabreak — the meta engine for Godot",
  description:
    "Parabreak is a runtime layer that gives your characters access to the things outside the game — the save file, the menu, the player's last session, the system clock. 35 typed hooks for Godot 4.x.",
  metadataBase: new URL("https://parabreak.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ko: "/ko",
      ja: "/ja",
      "x-default": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/favicon-16.svg", type: "image/svg+xml", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.svg", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "parabreak — the meta engine for Godot",
    description:
      "Build games that notice you back. 35 typed hooks across save, dialogue, UI, and OS-layer narrative for Godot 4.x.",
    url: "https://parabreak.com",
    siteName: "parabreak",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "parabreak — the meta engine for Godot",
    description:
      "Build games that notice you back. 35 typed hooks for Godot 4.x. Free Core. Paid Hooks and Plus.",
  },
};

function localeFromPath(path: string): "en" | "ko" | "ja" {
  if (path.startsWith("/ko")) return "ko";
  if (path.startsWith("/ja")) return "ja";
  return "en";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const lang = localeFromPath(h.get("x-pathname") || "/");
  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0A0B0F" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Parabreak",
              description:
                "The meta engine for Godot. 35 typed hooks across save manipulation, UI deconstruction, and OS-layer narrative.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Windows, macOS, Linux",
              url: "https://parabreak.com",
              offers: [
                { "@type": "Offer", name: "Parabreak VN Core", price: "0", priceCurrency: "USD" },
                { "@type": "Offer", name: "Parabreak Hooks", price: "49", priceCurrency: "USD" },
                { "@type": "Offer", name: "Parabreak Plus", price: "69", priceCurrency: "USD" },
              ],
            }),
          }}
        />
      </head>
      <body className="theme-dark">{children}</body>
    </html>
  );
}
