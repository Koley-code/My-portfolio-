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
  title: {
    default: 'Swarnendu Koley | Developer Blog',
    template: '%s | Swarnendu Koley',
  },
  description:
    'My developer journal about building projects, learning computer science, solving problems, and sharing what I discover along the way.',
  applicationName: 'Swarnendu Koley Blog',
  openGraph: {
    type: 'website',
    siteName: 'Swarnendu Koley Blog',
    title: 'Swarnendu Koley | Developer Blog',
    description:
      'Projects, coding lessons, experiments, and notes from my developer journey.',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swarnendu Koley | Developer Blog',
    description:
      'Projects, coding lessons, experiments, and notes from my developer journey.',
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