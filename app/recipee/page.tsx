"use client";
import Image from "next/image";

import { useState } from "react";
import TextLink from "@/components/TextLink";
import DottedBorder from "@/components/DottedBorder";
import Pill from "@/components/Pill";
import RecipeModule from "@/components/RecipeModule";
import TextEditable from "@/components/TextEditable";
import { MenuModalProvider } from "@/contexts/UseMenuModal";

// This page is only accessible to authenticated users.
// It is wrapped with the LayoutPrivate component to enforce access control.
// See https://docs.microsaasfast.me/private-page/
export default function Recipee() {
  const [viewMore, setViewMore] = useState(false);

  const handleViewMore = () => setViewMore(!viewMore);

  return (
    <MenuModalProvider>
      <section className="py-5">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-6">
          <DottedBorder className="grid grid-cols-1 content-evenly gap-y-6">
            <TextEditable className="line-clamp-2 text-2xl text-center leading-tight">
              My very long recipe name 350g version for client name
            </TextEditable>
            <TextEditable className="line-clamp-3 text-l text-center leading-tight">
              Thinly sliced flame-grilled rump with a side of roast vegetables and crispy bacon
              roast potato’s
            </TextEditable>

            {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-4"> */}
            <div className="flex flex-wrap justify-center gap-1 w-full">
              <Pill
                onClick={() => {
                  alert("hello METRIC");
                }}
                edit="edit"
                className="text-xs"
                iconName="visibility"
              >
                Metric: g/Kg
              </Pill>
              <Pill className="text-xs" iconName="event" edit="options">
                <div
                  onClick={() => {
                    alert("hello LAST SAVED");
                  }}
                  className="grid grid-rows-2 leading-none"
                >
                  <div>Last Saved</div>
                  <div className="text-[8px] leading-tight">22 Oct 2024 11h34 (WK)</div>
                </div>
              </Pill>
              <Pill
                tone="dark"
                className="text-xs"
                iconName="add_circle"
                edit="options"
                onClick={() => {
                  alert("hello SAVE");
                }}
              >
                Save
              </Pill>
              <Pill
                onClick={() => {
                  alert("hello OPTIONS");
                }}
                className="text-xs"
                edit="options"
                iconName="checklist"
              ></Pill>
            </div>
          </DottedBorder>
          {/* <div className="relative w-48 h-48 md:w-96 md:h-96  bg-slate-300 rounded-3xl overflow-hidden"> */}
          <DottedBorder className="relative overflow-hidden">
            <Image
              src="/food/FC7-350g Pesto Napoli Chicken & Low fat Cream 750x450_1x.jpg"
              alt="Description of image"
              layout="fill" // This allows the image to fill its parent container
              objectFit="cover" // Ensures the image is contained within its container
              objectPosition="center" // Centers the image within its container
              className="rounded-lg" // Additional Tailwind CSS classes for styling
            />
          </DottedBorder>
          <DottedBorder className=" bg-gradientGreyDarkerBott">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Pill tone="dark" edit="" className="text-sm" iconName="done_outline">
                  TODO
                </Pill>
                <Pill tone="white" edit="options" className="text-sm relative" iconName="skillet">
                  <span>Chef Feedback</span>
                  <div className="absolute top-[-4px] right-[-4px] text-white bg-red-700 w-4 h-4 rounded-full aspect-square leading-none flex place-items-center justify-center text-[9px]">
                    2
                  </div>
                </Pill>
              </div>
              <Pill tone="white" edit="edit" className="text-xs" iconName="done_outline">
                <div>3 days ago - Review WK Feedback</div>
              </Pill>
              <Pill tone="white" edit="edit" className="text-xs" iconName="hourglass_top">
                <div>3 days ago - Review WK Feedback</div>
              </Pill>
              <Pill tone="white" edit="edit" className="text-xs font-bold" iconName="done_outline">
                <div>3 days ago - Review WK Feedback</div>
              </Pill>
              <TextLink className="text-xs" onClick={() => {}}>
                -- see all --
              </TextLink>
            </div>
          </DottedBorder>
        </div>
      </section>
      <section className="py-5">
        <RecipeModule />
      </section>
      <section className="py-5">
        <DottedBorder>
          <p className={viewMore ? "" : "line-clamp-3"}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          {viewMore ? (
            <TextLink onClick={handleViewMore} className="">
              View Less
            </TextLink>
          ) : (
            <TextLink onClick={handleViewMore} className="">
              View More
            </TextLink>
          )}
        </DottedBorder>
      </section>
      <section className="py-5">
        <DottedBorder>
          <button data-collapse-target="myCollapse">Toggle Collapse</button>
          <div id="myCollapse" className="collapse">
            <div className="max-h-none overflow-hidden transition-all">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with deskttook a
              galley of type and scrambled it to make a type specimen book. It has survived not only
              five centuries, but also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.op publishing software like
              Aldus PageMaker including versions of Lorem Ipsum. took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five centuries, but also the
              leap into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions
              of Lorem Ipsum.
            </div>
          </div>
        </DottedBorder>
      </section>
    </MenuModalProvider>
  );
}
