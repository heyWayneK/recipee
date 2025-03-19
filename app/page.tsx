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
      <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10">
        {/* {renderSchemaTags()} */}
        <div className="flex items-center">
          <Image src={"/logo/recipee_logo_black.svg"} alt="Logo" width={800} height={400} />
        </div>

        <DottedBorder className="grid grid-cols-1 p-6 text-center sm:text-left  justify-center text-balance max-w-2xl">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] justify-stretch gap-10  first:text-2xl first:font-medium text-pretty">
            <span>The Future of Accurate Ai Food Management</span>
            <span className=" text-sm">
              Nutrition. <b>Recipe Lifecycle.</b> Food Management. <b>Food eCommerce.</b> Suppliers & Stock. <b>Production.</b> Sales. <br />
              <br />
              Coming soon.
            </span>
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

      <footer className=" h-40">
        <Footer />
      </footer>
    </>
  );
}
