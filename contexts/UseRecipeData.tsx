"use client";
import React, { useEffect } from "react";
import { useOrganization } from "@clerk/nextjs";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  // const { organization, isLoaded: isOrgLoaded } = useOrganization();
  // const orgId = organization?.id;
  const orgId = "1"; // Manual override for orgId
  const { fetchData, loaded } = useRecipeDataStore();

  useEffect(() => {
    if (orgId && !loaded) {
      fetchData(orgId);
    }
  }, [orgId, fetchData, loaded]);

  return <>{children}</>;
};
