import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import "./globals.css";
import AppProviders from "./providers"; // Import the new client component

const font = Inter({ subsets: ["latin"] });

// Export metadata and viewport as Next.js expects
export const metadata = {
  ...getSEOTags(),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: "/apple-touch-icon.png", // Next.js convention for apple-mobile-web-app-title
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // "use server"; // We dont need this, its autoamtically a server component
  return (
    // The suppressHydrationWarning is still useful here because of the dynamic
    // data-theme attribute managed by your theme provider on the client.
    <html lang="en" className={font.className} suppressHydrationWarning>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body className="text-xs md:text-sm lg:text-base text-base-content">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
