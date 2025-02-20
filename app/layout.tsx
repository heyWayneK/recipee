"use client";
import { ReactNode, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { ModalProvider } from "@/providers/bigModalProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const font = Inter({ subsets: ["latin"] });
// const font = Inter({ subsets: ["latin"], weight: "100", variable: ""});

// TODO Viewport doesnt like export
// export const viewport: Viewport = {
//   themeColor: config.colors.main,
//   width: "device-width",
//   initialScale: 1,
// };

// TODO: Need to add MetaData later in own component with "use server"??
// export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  const viewport: Viewport = {
    themeColor: config.colors.main,
    width: "device-width",
    initialScale: 1,
  };

  // useEffect(() => {
  //   // Apply dynamic classes after hydration
  //   document.documentElement.classList.add("hydrated");
  // }, []);

  return (
    /* INFO: 
            Using suppressHydrationWarning to stop the warning about Hydration
            of the className={font.className}. This seems to work fine
            this is an issue related to the daisyUi Light/Dark dynamic css classes 
    */
    // <StrictMode>
    <ThemeProvider>
      <html lang="en" data-theme={config.colors.theme} className={font.className} suppressHydrationWarning>
        {config.domainName && (
          <head>
            <PlausibleProvider domain={config.domainName} />
            {/* // OR
          <title></title>
          <meta name="description" content=""  />
        <link rel="icon" href="/favicon.ico"  /> */}
          </head>
        )}
        <body>
          {/* ClientLayout to provide common layout and functionality */}
          {/* <ClientLayout>{children}</ClientLayout> */}
          {children}
          <ModalProvider />
        </body>
      </html>
    </ThemeProvider>
    // </StrictMode>
  );
}
