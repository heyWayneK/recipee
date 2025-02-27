import { UseOnlineStatus } from "@/contexts/UseOnlineStatus";

const OnlineOffline = () => {
  const { isOnline } = UseOnlineStatus();
  return <div className={`w-svw text-sm text-center ${isOnline ? "bg-lime-400" : "bg-red-400"}`}>{isOnline ? <p>You are online</p> : <p>You are offline</p>}</div>;
};
export default OnlineOffline;
