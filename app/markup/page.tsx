"use client";
import React, { Suspense, useEffect, useState } from "react";
import { SystemDataProps, getRecipeDataFunc2, getSystemDataFunc2 } from "../api/data/all/functions/system_user_recipe";
import { RecipeProps } from "../api/recipe";
import { divide, get, set } from "cypress/types/lodash";
import { getSystemData } from "../api/data/system/route";
import Loading from "@/components/Loading";
import { PreCalculatedRecipeData } from "../api/data/all/route";

interface pageProps {
  //   children: ReactNode;
  //   className?: string;
}
const Page: React.FC<pageProps> = () => {
  const [system, setSystem] = useState<SystemDataProps>();
  const [recipe, setRecipe] = useState<PreCalculatedRecipeData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in parallel to potentially speed up the process
        const [systemData, recipeData] = await Promise.all([getSystemDataFunc2(1), getRecipeDataFunc2()]);

        setSystem(systemData as SystemDataProps);
        setRecipe(recipeData as PreCalculatedRecipeData);

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
          <div className={`className p-1`}>recipe: {recipe?.data.recipeDesc.toString()}</div>
        </div>
      )}
    </>
  );
};

export default Page;
