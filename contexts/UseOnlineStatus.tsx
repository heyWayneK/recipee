"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OnlineStatusContextProps {
  isOnline: boolean;
}

const OnlineStatusContext = createContext<OnlineStatusContextProps | undefined>(undefined);

export const OnlineStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. State to hold the online status.
  // We initialize with `undefined` to signify that we haven't checked yet.
  // This is key to avoiding hydration errors.
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // This effect hook runs only on the client, after the initial render.

    // Handler to update state to true
    const handleOnline = () => setIsOnline(true);
    // Handler to update state to false
    const handleOffline = () => setIsOnline(false);

    // Add event listeners to watch for network status changes
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set the initial status as soon as the component mounts on the client
    setIsOnline(navigator.onLine);

    // Cleanup function: remove the event listeners when the component unmounts
    // to prevent memory leaks.
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // 2. On the server, and on the initial client render, `isOnline` is `undefined`.
  // We return `null` so that the server-rendered output and the initial client
  // render are identical, preventing a hydration error.
  if (typeof isOnline === "undefined") {
    return null;
  }

  // 3. Once the useEffect has run on the client, `isOnline` will be true or false,
  // and we can safely render the indicator.

  return <OnlineStatusContext.Provider value={{ isOnline }}>{children}</OnlineStatusContext.Provider>;
};

export const UseOnlineStatus = (): OnlineStatusContextProps => {
  const context = useContext(OnlineStatusContext);
  if (context === undefined) {
    throw new Error("useOnlineStatus must be used within an OnlineStatusProvider");
  }
  return context;
};
