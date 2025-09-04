"use client";
import React, { useEffect, useState } from "react";

import { divide, get, set } from "cypress/types/lodash";
import Loading from "@/components/Loading";
import { PreCalculatedRecipeData, SystemDataProps } from "@/types/recipeTypes";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { getLiveRecipeData, getSystemDataFunc2 } from "../api/data/all/functions/system_user_recipe";
import { th } from "date-fns/locale";

interface pageProps {
  //   children: ReactNode;
  //   className?: string;
}
const Page: React.FC<pageProps> = () => {
  const [system, setSystem] = useState<SystemDataProps>();
  const [recipe, setRecipe] = useState<PreCalculatedRecipeData>();
  // const { systemData, recipeData } = useRecipeDataStore();

  const orgId = "1"; // Manual override for orgId

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in parallel to potentially speed up the process
        // TODO: Do we need this page
        if (!orgId) throw new Error("Organization ID is not available");
        if (!recipe || recipe.data.uuid) throw new Error("Recipe ID is not available");

        const [systemData, recipeData] = await Promise.all([getSystemDataFunc2(orgId), getLiveRecipeData(recipe.data.uuid, orgId)]);

        const dataObject = { data: recipeData[0] } as PreCalculatedRecipeData;

        setSystem(systemData as SystemDataProps);
        // setRecipe(recipeData as PreCalculatedRecipeData);
        setRecipe({ data: recipeData[0] } as PreCalculatedRecipeData);

        console.log("___Data", systemData, recipeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <>
      {!system ? (
        <Loading />
      ) : (
        <div>
          <div className={`className p-1`}>markup: {system?.markup[0]?.name.toString()}</div>
          <div className={`className p-1`}>recipe: {recipe?.data.desc.toString()}</div>
        </div>
      )}
    </>
  );
};

export default Page;
