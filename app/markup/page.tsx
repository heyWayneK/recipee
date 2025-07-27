"use client";
import React, { useEffect, useState } from "react";
import { getRecipeDataFunc2, getSystemDataFunc2 } from "../api/data/all/functions/system_user_recipe";
import { divide, get, set } from "cypress/types/lodash";
import Loading from "@/components/Loading";
import { PreCalculatedRecipeData, SystemDataProps } from "@/types/recipeTypes";
import { useRecipeData } from "@/contexts/useRecipeData";

interface pageProps {
  //   children: ReactNode;
  //   className?: string;
}
const Page: React.FC<pageProps> = () => {
  const [system, setSystem] = useState<SystemDataProps>();
  const [recipe, setRecipe] = useState<PreCalculatedRecipeData>();
  // const { systemData, recipeData } = useRecipeData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in parallel to potentially speed up the process
        // TODO: Do we need this page
        const [systemData, recipeData] = await Promise.all([getSystemDataFunc2("1"), getRecipeDataFunc2()]);

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
          <div className={`className p-1`}>recipe: {recipe?.data.desc.toString()}</div>
        </div>
      )}
    </>
  );
};

export default Page;
