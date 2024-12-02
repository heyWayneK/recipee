import HeaderRecipee from "@/components/HeaderRecipee";
import { ReactNode } from "react";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/libs/next-auth";
// import config from "@/config";

// This layout component is used to wrap private pages, ensuring that only authenticated users can access them.
// See https://docs.microsaasfast.me/private-page/
export default async function Recipee({
  // export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  // Get the user's session from the authentication system.
  // const session = await getServerSession(authOptions);

  // If the user is not authenticated, redirect them to the login page.
  // if (!session) {
  //   redirect(config.auth.loginUrl);
  // }

  // If the user is authenticated, render the children components.

  // TODO:
  // {renderSchemaTags()}

  return (
    <div className="grid grid-cols-[max-content_1fr_max-content] h-dvh w-dvw">
      <aside className=""></aside>
      <div className="grid grid-rows-[min-content_1fr_min-content] min-h-dvh px-6">
        <header className=" h-20">
          <HeaderRecipee />
        </header>
        <main className="">{children}</main>
        <footer className=" h-40">FOOTER</footer>
      </div>
      <aside className=""></aside>
    </div>
  );
}