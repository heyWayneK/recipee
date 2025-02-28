// TODO: WK removed becase of error uploading to vercel

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default async function LayoutBlog({ children }: { children: any }) {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>

      <main className="min-h-screen mx-auto">{children}</main>

      <div className="h-24" />

      <Footer />
    </div>
  );
}
