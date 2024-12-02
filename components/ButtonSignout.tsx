"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import config from "@/config";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ButtonSignout. to end the session and return to home page
const ButtonSignout = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const { data: session, status } = useSession();

  // Handles click event to sign in or redirect based on authentication status
  const handleSignout = () => {
    return signOut({ callbackUrl: "/" });
  };

  if (!session) return;
  // If the user is not authenticated, render a button to trigger sign-in
  return (
    <Button
      className={`btn bg-[#006fee] border-none scale-1 hover:scale-[1.05] transition-all duration-300 rounded-full px-8 hover:bg-[#006fee] ${
        extraStyle ? extraStyle : ""
      }`}
      onClick={handleSignout}
    >
      {text}
    </Button>
  );
};

export default ButtonSignout;
