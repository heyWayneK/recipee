"use client";
import { UseOnlineStatus } from "@/contexts/UseOnlineStatus";

const OnlineOffline = () => {
  const { isOnline } = UseOnlineStatus();
  return (
    // <div suppressHydrationWarning className="w-svw text-sm text-center" style={{ backgroundColor: `${isOnline ? "lime" : "red"}` }}>
    <div className="w-svw text-sm text-center" key="online-offline">
      <p>{isOnline ? "You are online" : "You are offline"}</p>
    </div>
  );
};
export default OnlineOffline;
