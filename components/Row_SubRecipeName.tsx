import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { ComponentsInDataProps } from "@/types/recipeTypes";
import Decimal from "decimal.js";
import TextEditable from "./TextEditable";

interface Row_SubRecipeSubNameProps {
  // subRecipe: ComponentsProps;
  subRecipe: ComponentsInDataProps; //
  colorNum: number;
  recipeIndex: number; // INFO: the index of recipe in recipeData.data.recipes[?]array
}

const Row_SubRecipeSubName: React.FC<Row_SubRecipeSubNameProps> = ({ subRecipe, colorNum, recipeIndex }) => {
  return (
    <Table_Cell className="" firstCol={false} header={false} type="controls" rowNum={colorNum} iconName="" key={"Row_SubRecipeSubNameProps"}>
      {/* <span className=" text-base-100  line-clamp-1">{subRecipe.name}</span> */}
      <TextEditable
        title={`Sub Recipe Name`}
        // path={`data.recipes[0].recipeDetail[${ingredient.order}].ingredName`}
        path={`data.recipes[${recipeIndex}].name`}
        dbExpectedType="plaintext"
        optionalContent={`Add ingredient name...`}
        instantDbUpdate={true}
        dbUpdateConfig={{
          model: "recipe_components_on_recipe",
          id: subRecipe.uuid,
          idColName: "uuid",
          field: "name",
        }}
      />
      <div className="">
        <Pill tone="white" className="" edit="" onClick={() => {}}>
          {/* Yield: {(subRecipe.yield ?? 0) * 100}% */}
          Yield: {new Decimal(subRecipe.yield ?? 0).times(100).toString()}%
        </Pill>
        <Pill tone="white" className="flex " iconName="arrow_drop_down" edit="" onClick={() => {}}>
          Version
          {/* {data.components[subRecipeId].version} */}
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeSubName;
