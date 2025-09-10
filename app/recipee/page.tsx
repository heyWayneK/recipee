"use client";
import RecipeModule from "@/components/RecipeModule";
import Recipe_RecipeNameBlock from "@/components/Recipe_RecipeNameBlock";
import Recipe_ImageBlock from "@/components/Recipe_ImageBlock";
import Recipe_TodoBlock from "@/components/Recipe_TodoBlock";
import Recipe_NoteBlock from "@/components/Recipe_NoteBlock";
import React, { useEffect } from "react";
import Loading from "@/components/Loading";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { trpc } from "@/app/_trpc/client";

// This page is only accessible to authenticated users.
// It is wrapped with the LayoutPrivate component to enforce access control.
// See https://docs.microsaasfast.me/private-page/
export default function Recipee() {
  const { qty, recipeData, systemData, fetchData, loaded } = useRecipeDataStore();
  const { data, isLoading, error } = trpc.data.getAllData.useQuery({ orgId: "1", recipeId: "1234567890" }, { enabled: !loaded });

  useEffect(() => {
    if (data) {
      fetchData(data);
    }
  }, [data, fetchData]);


  if (isLoading || !recipeData?.portionSizes?.length) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

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
