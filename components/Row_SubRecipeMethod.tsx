import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import { RecipeProps } from "@/app/data/recipe";

interface Row_SubRecipeMethodProps {
  recipe: RecipeProps;
}
const Row_SubRecipeMethod: React.FC<Row_SubRecipeMethodProps> = ({ recipe }) => {
  return (
    <Table_Cell className="" firstCol={false} header={false} type="method" iconName="" key={"method" + "_" + recipe.id}>
      <div className="grid justify-items text-left">
        <h4>Method</h4>
        <div className="">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen boe 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen box.
        </div>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeMethod;
