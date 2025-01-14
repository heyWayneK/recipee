"use client";
import Image from "next/image";

import { useState } from "react";
import TextLink from "@/components/TextLink";
import DottedBorder from "@/components/DottedBorder";
import Pill from "@/components/Pill";
import RecipeModule from "@/components/RecipeModule";
import TextEditable from "@/components/TextEditable";
import { MenuModalProvider } from "@/contexts/UseMenuModal";
import MenuOption1 from "@/components/MenuOption1";
import MenuOption2 from "@/components/MenuOption2";
import { getTextTranslation } from "@/lib/utils";
import { RecipeDataProvider } from "@/contexts/UseRecipeData";

// This page is only accessible to authenticated users.
// It is wrapped with the LayoutPrivate component to enforce access control.
// See https://docs.microsaasfast.me/private-page/
export default function Recipee() {
  const [viewMore, setViewMore] = useState(false);

  const handleViewMore = () => setViewMore(!viewMore);

  return (
    <MenuModalProvider>
      <RecipeDataProvider>
        <section className="py-5">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-6">
            <DottedBorder className="grid grid-cols-1 content-evenly gap-y-6">
              <TextEditable className="line-clamp-2 text-2xl text-center leading-tight">My very long recipe name 350g version for client name</TextEditable>
              <TextEditable className="line-clamp-3  text-center leading-tight">Thinly sliced flame-grilled rump with a side of roast vegetables and crispy bacon roast potato’s</TextEditable>

              <div className="flex flex-wrap justify-center gap-1 w-full">
                <MenuOption1>
                  <Pill edit="edit" className="text-xs" iconName="visibility">
                    {getTextTranslation("metric")}: g/Kg
                  </Pill>
                </MenuOption1>

                <MenuOption2>
                  <Pill className="text-xs" iconName="event" edit="options">
                    <div className="grid grid-rows-2 leading-none">
                      <div>Last Saved</div>
                      <div className="text-[8px] leading-tight">22 {getTextTranslation("Oct")} 2024 11h34 (WK)</div>
                    </div>
                  </Pill>
                </MenuOption2>

                <MenuOption2>
                  <Pill tone="dark" className="text-xs" iconName="add_circle" edit="options">
                    {getTextTranslation("Save")}
                  </Pill>
                </MenuOption2>

                <MenuOption2>
                  <Pill className="text-xs" edit="options" iconName="checklist"></Pill>
                </MenuOption2>
              </div>
            </DottedBorder>

            <DottedBorder className="relative overflow-hidden">
              <div style={{ position: "relative", width: "100%", height: "300px", overflow: "hidden", borderRadius: "20px" }}>
                <Image
                  src="/food/FC7-350g Pesto Napoli Chicken & Low fat Cream 750x450_1x.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  alt="Pesto Napoli Chicken"
                />
              </div>
            </DottedBorder>
            <DottedBorder className=" bg-gradientGreyDarkerBott">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Pill tone="dark" edit="" className="text-sm" iconName="done_outline">
                    {getTextTranslation("Todo")}
                  </Pill>
                  <Pill tone="white" edit="options" className="text-sm relative" iconName="skillet">
                    <span>{getTextTranslation("Chef Feedback")}</span>
                    <div className="absolute top-[-4px] right-[-4px] text-white bg-red-700 w-4 h-4 rounded-full aspect-square leading-none flex place-items-center justify-center text-[9px]">2</div>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with deskttook a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
                of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.op publishing software
                like Aldus PageMaker including versions of Lorem Ipsum. took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
            </div>
          </DottedBorder>
        </section>
      </RecipeDataProvider>
    </MenuModalProvider>
  );
}
