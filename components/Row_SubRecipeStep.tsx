import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";

interface Row_SubRecipeStepProps {
  children: ReactNode;
  stepCount: number;
}
const Row_SubRecipeStep: React.FC<Row_SubRecipeStepProps> = ({ children, stepCount }) => {
  return (
    <Table_Cell firstCol={false} className={"grid grid-flow-col"} type="step" iconName="lightbulb" key={"step" + "_" + stepCount}>
      <span className="font-extrabold uppercase ">
        step
        {` ${stepCount}`}
      </span>
      : {children}
    </Table_Cell>
  );
};

export default Row_SubRecipeStep;
