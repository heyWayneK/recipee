"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OnlineStatusContextProps {
  isOnline: boolean;
}

const OnlineStatusContext = createContext<OnlineStatusContextProps | undefined>(undefined);

export const OnlineStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    // This runs only on the client after hydration
    setIsOnline(navigator.onLine); // Set initial state

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Render nothing or a placeholder until the client determines the state
  if (isOnline === null) {
    return true; // Or a loading placeholder: <div>Loading...</div>
  }

  return <OnlineStatusContext.Provider value={{ isOnline }}>{children}</OnlineStatusContext.Provider>;
};

export const UseOnlineStatus = (): OnlineStatusContextProps => {
  const context = useContext(OnlineStatusContext);
  if (context === undefined) {
    throw new Error("useOnlineStatus must be used within an OnlineStatusProvider");
  }
  return context;
};
