import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: 'RsKBuysajedYi8lAl6wxsFxSLiZ1NmWJtL0yvbDwmHU',
  },

  title: {
    default: 'Swarnendu Koley | Creative Developer & 3D Designer',
    template: '%s | Swarnendu Koley',
  },

  description:
    'Portfolio of Swarnendu Koley, a creative developer and 3D designer building interactive web experiences, responsive interfaces, and immersive digital projects.',

  applicationName: 'Swarnendu Koley Portfolio',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    siteName: 'Swarnendu Koley',
    title: 'Swarnendu Koley | Creative Developer & 3D Designer',
    description:
      'Explore the portfolio of Swarnendu Koley, featuring interactive web experiences, creative development, projects, and 3D design.',
    url: '/',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Swarnendu Koley | Creative Developer & 3D Designer',
    description:
      'Interactive web experiences, creative development, projects, and 3D design by Swarnendu Koley.',
  },

  robots: {
    index: true,
    follow: true,
  },
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: siteConfig.meta.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}