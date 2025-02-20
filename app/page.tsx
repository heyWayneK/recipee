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

export const metadata = getSEOTags({
  title: "Welcome | Professional Recipee and Producton App",
  canonicalUrlRelative: "/tos",
});

export default function Home() {
  return (
    <>
      {renderSchemaTags()}
      {/* <Suspense>
        <Header />
      </Suspense> */}
      <main>
        <Hero />
        <LaunchApp />
        <Problem />
        <Features />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      {/* <Footer /> */}
    </>
  );
}
