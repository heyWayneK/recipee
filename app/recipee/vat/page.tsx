"use client";
import React from "react";
import { divide, get, set } from "cypress/types/lodash";
import Loading from "@/components/Loading";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";

interface pageProps {
  //   children: ReactNode;
  //   className?: string;
}
const Page: React.FC<pageProps> = () => {
  const { recipeData, systemData } = useRecipeDataStore();

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
          <div className={`className p-1`}>recipe: {recipeData?.data.desc.toString()}</div>
        </div>
      )}
    </>
  );
};

export default Page;
