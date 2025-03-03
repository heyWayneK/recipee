"use client";
import { UseOnlineStatus } from "@/contexts/UseOnlineStatus";

const OnlineOffline = () => {
  const { isOnline } = UseOnlineStatus();
  return (
    <div className={`w-svw text-sm text-center ${isOnline ? "bg-lime-400" : "bg-red-400"}`}>
      <p>{isOnline ? "You are online" : "You are offline"}</p>
    </div>
  );
};
export default OnlineOffline;
