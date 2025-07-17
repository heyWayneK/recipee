import React, { Suspense } from "react";
import Row_SubRecipesAll from "./Row_SubRecipesAll";
import Row_PlatingAll from "./Row_PlatingAll";
import { useRecipeData } from "@/contexts/useRecipeData";
import Loading from "./Loading";
export interface RecipeModuleProps {
  className?: string;
}

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  const { qty, setQty, recipeData, updateRecipeData, systemData, localOrDbData } = useRecipeData();

  if (!recipeData.portionSizes.length) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      {/* <div>hellp {myObject?.key}</div> */}
      {/* DATA STORAGE - From Local Storage or DB */}
      <div className=" text-xs text-base-content/20 justify-self-end pr-4">
        Recipe: {localOrDbData.recipe} | SYSTEM: {localOrDbData.system}
      </div>
      <Row_PlatingAll />
      <Row_SubRecipesAll />
    </Suspense>
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
