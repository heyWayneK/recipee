// app/providers.tsx

"use client";
// The Home Page, above this is a server side page (SSR)
// // This file contains all the client-side providers and components

import { ReactNode, StrictMode } from "react";
import { ModalProvider } from "@/providers/bigModalProvider";
import { DarkLightThemeProvider } from "@/contexts/useThemeDarkLight";
import { ClerkProvider } from "@clerk/nextjs";
import { OnlineStatusProvider } from "@/contexts/useOnlineStatus";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// This component isolates all client-side logic
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <ClerkProvider>
        <DarkLightThemeProvider>
          <OnlineStatusProvider>
            <header>
              <Header />
            </header>

            <div className="flex flex-col min-h-screen">
              <div className="flex-grow grid grid-cols-[min-content_1fr_min-content] h-full gap-0">
                <aside aria-label="Left Cookbook Manager"></aside>
                <main aria-label="Main Recipee App Content" className="px-1 md:px-6">
                  {children}
                </main>
                <aside aria-label="Right Menu Sidebar"></aside>
              </div>

              <footer aria-label="Recipee footer" className="min-h-40">
                <Footer />
              </footer>
            </div>

            <ModalProvider />
          </OnlineStatusProvider>
        </DarkLightThemeProvider>
      </ClerkProvider>
    </StrictMode>
  );
}
