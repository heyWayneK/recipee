"use client";
import RecipeModule from "@/components/RecipeModule";
import Recipe_RecipeNameBlock from "@/components/Recipe_RecipeNameBlock";
import Recipe_ImageBlock from "@/components/Recipe_ImageBlock";
import Recipe_TodoBlock from "@/components/Recipe_TodoBlock";
import Recipe_NoteBlock from "@/components/Recipe_NoteBlock";
import React from "react";
import Loading from "@/components/Loading";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";

// This page is only accessible to authenticated users.
// It is wrapped with the LayoutPrivate component to enforce access control.
// See https://docs.microsaasfast.me/private-page/
export default function Recipee() {
  const { qty, recipeData, systemData } = useRecipeDataStore();
  // console.log("should have loaded recipe data", qty, recipeData, systemData, localOrDbData);

  console.log("recipeData", { qty, recipeData, systemData });

  if (!recipeData?.portionSizes?.length) return <Loading />;
  return (
    <>
      {/* // <MenuModalProvider> */}
      {/* <RecipeDataProvider> */}
      <section className="py-5">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-6 sm:gap-x-3 sm:gap-3">
          <Recipe_RecipeNameBlock />
          <Recipe_ImageBlock />
          <Recipe_TodoBlock />
        </div>
      </section>
      <section className="py-5">
        <RecipeModule />
      </section>
      <section className="py-5">
        <Recipe_NoteBlock />
      </section>
      <div data-testid="test">test-1234</div>
      {/* </RecipeDataProvider> */}
      {/* // </MenuModalProvider> */}
    </>
  );
}
