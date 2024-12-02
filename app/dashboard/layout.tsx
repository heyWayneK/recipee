import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";

// This layout component is used to wrap private pages, ensuring that only authenticated users can access them.
// See https://docs.microsaasfast.me/private-page/
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  // Get the user's session from the authentication system.
  const session = await getServerSession(authOptions);

  // If the user is not authenticated, redirect them to the login page.
  if (!session) {
    redirect(config.auth.loginUrl);
  }

  // If the user is authenticated, render the children components.
  return (
    <>
      <div className=" mt-72">{children}</div>
    </>
  );
}
