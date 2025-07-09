"use client";
import { MenuModalProvider } from "@/contexts/useMenuModal";
import { RecipeDataProvider } from "@/contexts/useRecipeData";
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
