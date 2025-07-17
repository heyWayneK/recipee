"use client";
import React, { Suspense, useEffect, useState } from "react";
import { SystemDataProps, getRecipeDataFunc2, getSystemDataFunc2 } from "../../api/data/all/functions/system_user_recipe";
import { RecipeProps } from "../../api/recipe";
import { divide, get, set } from "cypress/types/lodash";
import { getSystemData } from "../../api/data/system/route";
import Loading from "@/components/Loading";
import { PreCalculatedRecipeData } from "../../api/data/all/route";
import { useRecipeData } from "@/contexts/useRecipeData";

interface pageProps {
  //   children: ReactNode;
  //   className?: string;
}
const Page: React.FC<pageProps> = () => {
  const { localOrDbData, recipeData, systemData } = useRecipeData();

  console.log("___ SYSTEMDATA", systemData);
  console.log("___%RECIPEDATA", recipeData);

  // const [system, setSystem] = useState<SystemDataProps>();
  // const [recipe, setRecipe] = useState<PreCalculatedRecipeData>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch data in parallel to potentially speed up the process
  //       const [systemData, recipeData] = await Promise.all([getSystemDataFunc2(1), getRecipeDataFunc2()]);

  //       setSystem(systemData as SystemDataProps);
  //       setRecipe(recipeData as PreCalculatedRecipeData);

  //       console.log("___Data", systemData, recipeData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Call the async function
  //   fetchData();
  // }, []);

  return (
    <>
      {!systemData ? (
        <Loading />
      ) : (
        <div>
          <div className={`className p-1`}>markup: {systemData?.markup[0].markup_type.name.toString()}</div>
          <div className={`className p-1`}>recipe: {recipeData?.data.recipeDesc.toString()}</div>
          <div className={`className p-1`}>localOrDbData: {localOrDbData?.user}</div>
        </div>
      )}
    </>
  );
};

export default Page;
