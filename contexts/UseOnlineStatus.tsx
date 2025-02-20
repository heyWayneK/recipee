import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OnlineStatusContextProps {
  isOnline: boolean;
}

const OnlineStatusContext = createContext<OnlineStatusContextProps | undefined>(undefined);

export const OnlineStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <OnlineStatusContext.Provider value={{ isOnline }}>{children}</OnlineStatusContext.Provider>;
};

export const UseOnlineStatus = (): OnlineStatusContextProps => {
  const context = useContext(OnlineStatusContext);
  if (context === undefined) {
    throw new Error("useOnlineStatus must be used within an OnlineStatusProvider");
  }
  return context;
};
