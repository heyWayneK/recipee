"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Crisp } from "crisp-sdk-web";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";
import Header from "./Header";

// Component to configure and manage Crisp chat functionality
const CrispChat = (): null => {
  const pathname = usePathname();
  const { data } = useSession();

  useEffect(() => {
    // Configure Crisp chat if ID is available
    if (config?.crisp?.id) {
      Crisp.configure(config.crisp.id);

      // Hide Crisp chat on routes not included in the configuration
      if (
        config.crisp.onlyShowOnRoutes &&
        !config.crisp.onlyShowOnRoutes?.includes(pathname)
      ) {
        Crisp.chat.hide();

        // Ensure chat remains hidden when closed
        Crisp.chat.onChatClosed(() => {
          Crisp.chat.hide();
        });
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Set user ID in Crisp session if user data is available
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);

  return null; // No visible output from this component
};

// Layout component
const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        {/* TopLoader for showing loading progress */}
        <NextTopLoader color={config.colors.main} showSpinner={false} />
        <Suspense>
          <Header />
        </Suspense>
        <div className="bg-black">{children}</div>
        <footer />
        {/* Toaster for displaying toast notifications */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* Tooltip component for displaying tooltips */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

        {/* CrispChat component to handle Crisp chat */}
        <CrispChat />
      </SessionProvider>
    </>
  );
};

export default ClientLayout;
