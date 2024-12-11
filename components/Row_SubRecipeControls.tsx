import React from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";

interface Row_SubRecipeControlsProps {
  className?: string;
  subRecipeId: number;
}
const Row_SubRecipeControls: React.FC<Row_SubRecipeControlsProps> = ({
  className = "",
  subRecipeId,
}) => {
  return (
    <Table_Cell
      firstCol={false}
      header={false}
      type="controls"
      iconName=""
      key={"Row_SubRecipeControls"}
    >
      {/* SHOW PRICES BUTTON */}
      <Pill tone="dark" className="text-xs" iconName="" edit="" onClick={() => {}}>
        SUB RECIPE
      </Pill>
      <div>
        <Pill tone="white" className="text-xs" iconName="speech_to_text" edit="" onClick={() => {}}>
          GIVE CHEF FEEDBACK
        </Pill>
        <Pill
          tone="white"
          className=" text-xs bg-red-600"
          iconName="warning"
          edit=""
          onClick={() => {}}
        >
          YOU HAVE FEEDBACK
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeControls;
