import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import { RecipeProps } from "@/types/recipeTypes";
import { getTextTranslation } from "@/utils/utils";
// import { RecipeProps } from "@/app/api/recipe";

interface Row_SubRecipeActionsProps {
  recipe: RecipeProps;
  methods: string[];
  extraMethods: string;
}
const Row_SubRecipeActions: React.FC<Row_SubRecipeActionsProps> = ({ recipe, methods = [], extraMethods = "" }) => {
  return (
    <Table_Cell className="" firstCol={false} header={false} type="controls" iconName="" key={"method"}>
      <div className="grid justify-items text-left">
        <h4 className=" capitalize">{getTextTranslation("actions")}</h4>
        <div className="">
          {methods.map((method, index) => (
            <div key={index} className="text-xs text-base-content/80">
              {`${index + 1}. `} {method}
            </div>
          ))}
          {!extraMethods || <div>{extraMethods}</div>}
        </div>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeActions;
