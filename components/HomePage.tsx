import React, { ReactNode } from "react";
import DottedBorder from "./DottedBorder";
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

export const metadata = getSEOTags({
  title: "Welcome | Professional Recipee and Producton App",
  canonicalUrlRelative: "/tos",
});

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-top p-4 gap-10 ">
        {/* {renderSchemaTags()} */}
        <div className="flex items-center">
          <Image src={"/logo/recipee_logo_black.svg"} alt="Logo" width={800} height={400} />
        </div>

        <DottedBorder className="grid grid-cols-1 p-6  text-center sm:text-left  justify-center text-balance max-w-2xl">
          <div className="grid grid-cols-1  py-6 justify-stretch gap-10 capitalize first:text-2xl first:font-medium text-pretty">
            <p>Recipe Management Systems have failed chefs and tastebuds...</p>
            <p className="text-base">
              Until Now. <span className="py-1 px-2 bg-black text-white rounded-lg">We have the solution.</span>
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] justify-stretch gap-10  first:text-2xl first:font-medium text-pretty">
            <span className=" text-xl font-bold">The Future of Accurate Easy Ai-powered E-commerce Food Management</span>
            <span className=" text-sm">
              Nutrition. <b>Recipe Lifecycle.</b> Food Management. <b>Food E-Commerce.</b> Suppliers & Stock. <b>Production.</b> Sales. <b>Professional Bulk Management.</b> <br />
              <br />
              <p className="text-slate-400 text-sm">Coming soon. early bird signup launching shortly.</p>
            </span>
          </div>
        </DottedBorder>
      </div>
      {/* <HeaderRecipee /> */}

      {/* <Hero />
      <LaunchApp />
      <Problem />
      <Features />
      <Pricing />
      <FAQ />
      <CTA /> */}
    </>
  );
};

export default HomePage;
