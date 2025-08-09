"use client";

import { MenuModalProvider } from "@/contexts/UseMenuModal";
import { RecipeDataProvider } from "@/contexts/useRecipeData";
import { ReactNode } from "react";

export default function Recipee({ children }: { children: ReactNode }) {
  return (
    // INFO: May have to move RecipeDataProvider to the top level
    <RecipeDataProvider>
      <MenuModalProvider>{children}</MenuModalProvider>
    </RecipeDataProvider>
  );
}
