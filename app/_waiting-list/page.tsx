// TODO: WK removed becase of error uploading to vercel

import config from "@/config";
import { getSEOTags } from "@/libs/seo";
// import Form from "./_assets/components/form";

export const metadata = getSEOTags({
  title: `${config.appName} Waiting List`,
  description: "Add waiting list emails to database",
});

export default function WaitingList() {
  return (
    <>
      <section className="text-center max-w-xl w-full mx-auto pt-32 mb-24 md:mb-32 px-4 sm:px-8">
        <h1 className="font-extrabold text-[30px] lg:text-[48px] leading-snug mb-12 text-white">{config.appName} Waiting List</h1>
        {/* <Form /> */}
      </section>
    </>
  );
}
