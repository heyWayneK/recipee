import React, { Suspense, useEffect } from "react";
import Row_SubRecipesAll from "./Row_SubRecipesAll";
import Row_PlatingAll from "./Row_PlatingAll";
import { useRecipeData } from "@/contexts/UseRecipeData";
import Loading from "./Loading";
import { preCalculateData } from "@/libs/preCalculatedRecipeData";

export interface RecipeModuleProps {
  className?: string;
}

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  const { qty, setQty, recipeData, updateRecipeData } = useRecipeData();

  useEffect(() => {
    try {
      // CREATE THE TOTALS, SUB TOTALS, PAACKAGING VALUES etc
      preCalculateData(recipeData, updateRecipeData);
    } catch (error: any) {
      throw new Error(error.message);
    }
    // TODO: DONT add recipeData to the dependencies!
    // FIXME: This will cause an infinite loop
  }, []);

  console.log("recipe data", recipeData);
  //  TODO: remove or use qty and serQty?
  console.log("qty & setQty use? - fix", qty, setQty);

  if (!recipeData.portionSizes.length) return <Loading />;

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <div>hellp {myObject?.key}</div> */}
        <Row_PlatingAll />
        <Row_SubRecipesAll />
      </Suspense>
    </>
  );
};

export default RecipeModule;

/** 
// RELOAD Either Serverside or client side props
export async function getStaticProps() {
  // Fetch or initialize data here
  const myObject = { key: "Hello Wayne" };
  return {
    props: {
      myObject,
    },
  };
}
export async function getServerSideProps() {
  // Fetch or initialize data here
  const myObject = { key: "Hello Wayne" };
  return {
    props: {
      myObject,
    },
  };
}


// WRAP IN get serverside or static props()
import data from './data.json';

interface DataStructure {
  id: number;
  name: string;
  // Define other fields as per your JSON structure
}

const typedData: DataStructure[] = data as DataStructure[];

*/
