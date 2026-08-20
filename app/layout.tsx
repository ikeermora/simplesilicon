import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ikeermora.github.io/simple-silicon";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Simple Silicon — All-in-one EDA, made clear",
  description: "An all-in-one EDA environment in development for designing, simulating, and understanding digital hardware.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_SITE_BASE ?? ""}/favicon.png`,
    shortcut: `${process.env.NEXT_PUBLIC_SITE_BASE ?? ""}/favicon.png`,
  },
  openGraph: {
    title: "Simple Silicon — All-in-one EDA, made clear",
    description: "One accessible environment for the digital hardware design flow, built from a working RTL and simulation foundation.",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-v2.png`,
        width: 1200,
        height: 630,
        alt: "Simple Silicon — an all-in-one EDA environment in development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Silicon — All-in-one EDA, made clear",
    description: "One accessible environment for the digital hardware design flow, built from a working RTL and simulation foundation.",
    images: [`${siteUrl}/og-v2.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
