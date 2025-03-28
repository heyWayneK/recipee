"use client";
require("dotenv").config();
import { ReactNode, useContext, useEffect } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { ModalProvider } from "@/providers/bigModalProvider";
import { ThemeContext, ThemeProvider } from "@/contexts/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import { OnlineStatusProvider } from "@/contexts/UseOnlineStatus";

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

  // const { theme, toggleTheme } = useContext(ThemeContext);
  // useEffect(() => {
  //   // Apply dynamic classes after hydration
  //   document.documentElement.classList.add("hydrated");
  // }, []);

  // console.log("RootLayout: config.colors.theme", config.colors.theme);

  return (
    /* INFO: 
            Using suppressHydrationWarning to stop the warning about Hydration
            of the className={font.className}. This seems to work fine
            this is an issue related to the daisyUi Light/Dark dynamic css classes 
    */
    // <StrictMode>
    <ClerkProvider>
      <ThemeProvider>
        <OnlineStatusProvider>
          {/* <html lang="en" data-theme={config.colors.theme} className={font.className} suppressHydrationWarning> */}
          <html lang="en" data-theme={config.colors.theme} className={font.className} suppressHydrationWarning>
            {config.domainName && (
              <head>
                <PlausibleProvider domain={config.domainName} />
                {/* // OR
          <title></title>
          <meta name="description" content=""  /> */}
                <meta name="apple-mobile-web-app-title" content="recipee.app" />
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                {/* <link rel="icon" type="image/svg+xml" href="%PUBLIC_URL%/favicon.svg" /> */}
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="manifest" href="/site.webmanifest" />
              </head>
            )}
            <body>
              {/* ClientLayout to provide common layout and functionality */}
              {/* <ClientLayout>{children}</ClientLayout> */}
              {children}
              <ModalProvider />
            </body>
          </html>
        </OnlineStatusProvider>
      </ThemeProvider>
    </ClerkProvider>
    // </StrictMode>
  );
}
