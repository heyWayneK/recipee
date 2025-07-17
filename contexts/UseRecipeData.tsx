"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { mergeDeep } from "@/libs/mergeDeep";
// import { getUserData } from "@/app/api/data/user/[profileid]/route";

import { all } from "cypress/types/bluebird";
import { set } from "cypress/types/lodash";
import { use } from "chai";
import { Console } from "console";
import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { useOrganization } from "@clerk/nextjs";
import { PreCalculatedRecipeData, localOrDbDataType } from "@/types/recipeTypes";
import { RecipeDataContextType, RecipeModeType, SystemDataProps } from "@/types/recipeTypes";

// FUTURE: POTENTIALLY USE GETSTATICPROPS for cache
// import { GetStaticProps } from "next";

// 1. Create Context
const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

// 2. Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);
  const [recipeMode, setRecipeMode] = useState<RecipeModeType>("advanced");
  const [systemData, setSystemData] = useState<SystemDataProps>();
  const [recipeData, setRecipeData] = useState<PreCalculatedRecipeData>();
  const [localOrDbData, setLocalOrDbData] = useState<localOrDbDataType>({
    system: undefined,
    systemUpdated: undefined,
    recipe: undefined,
    recipeUpdated: undefined,
  });
  // How often should the data come from the database, else use localStorage?
  const secsToUpdate = 60; // 60 seconds
  // clerk auth, getting organisation id
  const { organization, membership, isLoaded: isOrgLoaded } = useOrganization();
  const orgId = organization?.id || undefined;

  useEffect(() => {
    const fetchData = async () => {
      console.log("USEEFFECT FETCH:/api/data/all");

      try {
        // TODO: Get Org ID from session.
        // Decimal safe by using the backend to fetch data

        const systemDataLocal = localStorage.getItem("systemData") || undefined;
        const recipeDataLocal = localStorage.getItem("recipeData") || undefined;
        const systemDataUpdated = localStorage.getItem("systemDataUpdated") || undefined;
        const recipeDataUpdated = localStorage.getItem("recipeDataUpdated") || undefined;
        const date = new Date();

        if (date.getTime() - new Date(systemDataUpdated ?? 0).getTime() > secsToUpdate * 1000) {
          console.log("OUTDATED______System data is outdated, fetching from database");
        } else {
          console.log("DATE OK");
        }

        if ((systemDataLocal === undefined && recipeDataLocal === undefined) || (systemDataUpdated && date.getTime() - new Date(systemDataUpdated).getTime() > 60000)) {
          setLocalOrDbData({ system: "database", systemUpdated: date, recipe: "database", recipeUpdated: date });

          // TODO: Get OrgId is a string e.g. "org_2tuFiVo2CKPh6oDQVFjn4pZCDZm"
          if (orgId === "") console.warn("CustomerId cannot be 1 (Admin System Data)");

          const response = await fetch("/api/data/all");
          // const response = await fetch(`/api/data/all/${orgId}`);
          const { systemData, recipeData } = await response.json();

          // // Alternative Fetch (Decimal break)
          // getAllRecipeObject(customerId);

          // Deconstruct the data
          setSystemData(systemData as SystemDataProps);
          setRecipeData(recipeData as PreCalculatedRecipeData);

          // Local Storage to avoid calling the databse too often
          localStorage.setItem("systemData", JSON.stringify(systemData));
          localStorage.setItem("recipeData", JSON.stringify(recipeData));
          localStorage.setItem("systemDataUpdated", new Date().toISOString());
          localStorage.setItem("recipeDataUpdated", new Date().toISOString());
        } else if (systemDataLocal && recipeDataLocal) {
          const systemDataLocalParsed = JSON.parse(systemDataLocal);
          const recipeDataLocalParsed = JSON.parse(recipeDataLocal);

          setSystemData(systemDataLocalParsed as SystemDataProps);
          setRecipeData(recipeDataLocalParsed as PreCalculatedRecipeData);

          setLocalOrDbData({
            system: "localStorage",
            systemUpdated: date,
            recipe: "localStorage",
            recipeUpdated: date,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [orgId]); // orgId is used to fetch the data, if not available, it will use the default system data

  // SURE I DONT NEED THIS?
  const updateRecipeData = useCallback((newData: Partial<PreCalculatedRecipeData>) => {
    setRecipeData((prevData) => {
      const merge: PreCalculatedRecipeData = mergeDeep(prevData, { ...newData });
      return merge;
    });
  }, []);

  const value: RecipeDataContextType = {
    qty,
    setQty,
    recipeMode,
    setRecipeMode,
    recipeData: recipeData ?? ({} as PreCalculatedRecipeData),
    updateRecipeData,
    systemData: systemData ?? ({} as SystemDataProps),
    localOrDbData: localOrDbData,
  };

  // 2. Return Context
  return <RecipeDataContext.Provider value={value}>{children}</RecipeDataContext.Provider>;
};

// 3. Export Hook
export const useRecipeData = () => {
  const context = useContext(RecipeDataContext);
  if (context === undefined) throw new Error("useRecipeData is used in the wrong context");
  return context;
};
