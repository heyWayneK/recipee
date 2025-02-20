"use client";
import Image from "next/image";
import { useState } from "react";
import TextLink from "@/components/TextLink";
import DottedBorder from "@/components/DottedBorder";
import Pill from "@/components/Pill";
import RecipeModule from "@/components/RecipeModule";
import { MenuModalProvider } from "@/contexts/UseMenuModal";
import { getTextTranslation } from "@/libs/utils";
import { RecipeDataProvider } from "@/contexts/UseRecipeData";
import Recipe_RecipeNameBlock from "@/components/Recipe_RecipeNameBlock";

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
            <Recipe_RecipeNameBlock />

            <DottedBorder className="p-0">
              <div style={{ position: "relative", width: "100%", height: "300px", overflow: "hidden", borderRadius: "20px" }}>
                {/* TODO: Get sizes working  to optimise serverside image resize */}
                <Image
                  src="/food/FC7-350g Pesto Napoli Chicken & Low fat Cream 750x450_1x.jpg"
                  priority
                  fill
                  sizes="(max-width: 400px) 100vw, (max-width: 1200px) 40vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  alt="Pesto Napoli Chicken"
                />
              </div>
            </DottedBorder>
            <DottedBorder className=" bg-gradientGreyDarkerBott">
              <div className="flex flex-col items-start justify-items-start gap-4  h-min">
                <div className="flex gap-4">
                  <Pill tone="dark" edit="" className="text-sm" iconName="done_outline">
                    {getTextTranslation("Todo")}
                  </Pill>
                  <Pill tone="white" edit="options" className="text-sm relative" iconName="skillet">
                    <span>{getTextTranslation("Chef Feedback")}</span>
                    <div className="absolute top-[-4px] right-[-4px] text-white bg-red-700 w-4 h-4 rounded-full aspect-square leading-none flex place-items-center justify-center text-[9px]">2</div>
                  </Pill>
                </div>
                <Pill tone="white" edit="edit" className="text-xs line-clamp-1" iconName="done_outline">
                  <div>3 days ago - Review WK Feedback</div>
                </Pill>
                <Pill tone="white" edit="edit" className="text-xs line-clamp-1" iconName="hourglass_top">
                  <div>3 days ago - Review WK Feedback</div>
                </Pill>
                <Pill tone="white" edit="edit" className="text-xs font-bold line-clamp-1" iconName="done_outline">
                  <div>3 days ago - Review WK Feedback</div>
                </Pill>
                <TextLink className="text-xs line-clamp-1" onClick={() => {}}>
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
