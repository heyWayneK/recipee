import React, { Suspense } from "react";
import Row_SubRecipesAll from "./Row_SubRecipesAll";
import Row_PlatingAll from "./Row_PlatingAll";
import { useRecipeData } from "@/contexts/UseRecipeData";
import Loading from "./Loading";
export interface RecipeModuleProps {
  className?: string;
}

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  const { qty, setQty, recipeData, updateRecipeData, systemData, userData } = useRecipeData();

  console.log("recipeData", { qty, recipeData, systemData, userData });

  if (!recipeData.portionSizes.length) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      {/* <div>hellp {myObject?.key}</div> */}
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
