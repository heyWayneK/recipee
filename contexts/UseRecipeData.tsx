"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { mergeDeep } from "@/libs/mergeDeep";
import { all } from "cypress/types/bluebird";
import { set } from "cypress/types/lodash";
import { useOrganization } from "@clerk/nextjs";
import { PreCalculatedRecipeData, localOrDbDataType } from "@/types/recipeTypes";
import { RecipeDataContextType, RecipeModeType, SystemDataProps } from "@/types/recipeTypes";
import { getValueByPath, setValueByPath } from "@/utils/getSetValueFromObject";

// FUTURE: POTENTIALLY USE GETSTATICPROPS for cache
// import { GetStaticProps } from "next";

// 1. Create Context
const RecipeDataContext = createContext<RecipeDataContextType | undefined>(undefined);

interface RecipeDataProviderProps {
  children: React.ReactNode;
}

// Describes the props for our reusable component
interface DynamicInputProps {
  data: PreCalculatedRecipeData;
  setData: React.Dispatch<React.SetStateAction<PreCalculatedRecipeData>>;
  path: string;
  label: string;
}

// 2. Context provider component
export const RecipeDataProvider: React.FC<RecipeDataProviderProps> = ({ children }) => {
  const [qty, setQty] = useState<number>(1);
  const [recipeMode, setRecipeMode] = useState<RecipeModeType>("pro");
  const [systemData, setSystemData] = useState<SystemDataProps>({} as SystemDataProps);
  const [recipeData, setRecipeData] = useState<PreCalculatedRecipeData>({} as PreCalculatedRecipeData);
  const [localOrDbData, setLocalOrDbData] = useState<localOrDbDataType>({
    system: undefined,
    systemUpdated: undefined,
    recipe: undefined,
    recipeUpdated: undefined,
  });
  // How often should the data come from the database, else use localStorage?
  const secsToUpdate = 3600; // 60 seconds
  // clerk auth, getting organisation id
  const { organization, membership, isLoaded: isOrgLoaded } = useOrganization();
  const orgId = organization?.id || undefined;

  useEffect(() => {
    const fetchData = async () => {
      // console.log("USEEFFECT FETCH:/api/data/all");

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

          if (response.status === 500) {
            throw new Error("Offline, Please check connection");
          }

          // TODO: future calls need to use the orgId and recipeId
          // const response = await fetch(`/api/data/all/${orgId}/${recipeId}`, {);
          const { systemData, recipeData } = await response.json();

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

  /**
   * example usage:
   * updateRecipeData((recipeData.data.packagingCostsId = { ...newObj })); };
   * @param newData
   * @returns
   * USESES MERGEDEEP
   *  const complexUpdate = {
      portionSizes: [4, 5],
      components: {
        0: { val: "updated one" },
        1: { val: "updated two" }
      }
    };
    setMyObjState((prev) => mergeDeep(prev, complexUpdate));
   */

  const setRecipeDataByPath = useCallback((path: string, value: any, recipeData: PreCalculatedRecipeData) => {
    setRecipeData((prevData): any => {
      const merge: Partial<PreCalculatedRecipeData> = setValueByPath(recipeData, path, value);
      return { ...prevData, ...merge };
    });
  }, []);

  const getRecipeDataByPath = useCallback((path: string, recipeData: PreCalculatedRecipeData): any => {
    return getValueByPath(recipeData, path);
  }, []);

  const value: RecipeDataContextType = {
    qty,
    setQty,
    recipeMode,
    setRecipeMode,
    recipeData: recipeData ?? ({} as PreCalculatedRecipeData),
    getRecipeDataByPath,
    setRecipeDataByPath,
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
