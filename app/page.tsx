import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LaunchApp from "@/components/LaunchApp";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import HeaderRecipee from "@/components/HeaderRecipee";
import Image from "next/image";
import DottedBorder from "@/components/DottedBorder";

export const metadata = getSEOTags({
  title: "Welcome | Professional Recipee and Producton App",
  canonicalUrlRelative: "/tos",
});

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 gap-10">
        {/* {renderSchemaTags()} */}
        <div className="flex items-center">
          <Image src={"/logo/recipe_logo_black.svg"} alt="Logo" width={800} height={400} />
        </div>

        <DottedBorder className="grid grid-cols-1 text-left content-center gap-y-6 p-14 w-4/6 max-w-1xl justify-center text-balance">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-center gap-10">
            <b>The Future of Accurate Ai Food Management</b>
            <br /> <br />
            Nutrition. Recipe Life Cycle. Food Management. Food eCommerce. Suppliers. Stock. Production. Sales.
            <br /> <br />
            Coming really soon.
          </div>
        </DottedBorder>
      </main>
      {/* <HeaderRecipee /> */}

      {/* <Hero />
      <LaunchApp />
      <Problem />
      <Features />
      <Pricing />
      <FAQ />
      <CTA /> */}

      {/* <footer className=" h-40">
        <Footer />
      </footer> */}
    </>
  );
}
