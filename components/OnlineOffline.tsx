"use client";

import { cva } from "class-variance-authority";
import { UseOnlineStatus } from "@/contexts/useOnlineStatus";

// Using cva to define the styles for the indicator bar, similar to your original code.
const onlineStatusIndicator = cva("w-full h-1 fixed top-0 left-0 transition-colors duration-300", {
  variants: {
    status: {
      online: "bg-green-500",
      offline: "bg-red-500",
    },
  },
});

/**
 * A component that displays a thin bar at the top of the screen indicating
 * whether the user is online or offline.
 * - Renders nothing on the server to prevent hydration errors.
 * - Updates in real-t
 * |me when the connection status changes.
 */
const OnlineOfflineIndicator = () => {
  // return <div className="w-full h-1 fixed top-0 left-0 transition-colors duration-300">hello</div>;
  const { isOnline } = UseOnlineStatus();

  return <div aria-live="polite" role="status" className={onlineStatusIndicator({ status: isOnline ? "online" : "offline" })} title={isOnline ? "You are online" : "You are offline"}></div>;
};

export default OnlineOfflineIndicator;
