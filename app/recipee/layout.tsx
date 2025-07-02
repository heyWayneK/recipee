"use client";
import { MenuModalProvider } from "@/contexts/UseMenuModal";
import { RecipeDataProvider } from "@/contexts/UseRecipeData";
import { ReactNode } from "react";

export default function Recipee({ children }: { children: ReactNode }) {
  return (
    <>
      <MenuModalProvider>
        <RecipeDataProvider>{children}</RecipeDataProvider>
      </MenuModalProvider>
    </>
  );
}
