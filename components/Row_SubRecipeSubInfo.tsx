import React, { ReactNode } from "react";
import Table_Cell from "./Table_Cell";
import Pill from "./Pill";
import { data } from "@/app/data/recipe";

interface Row_SubRecipeSubInfoProps {
  className?: string;
  subRecipeId: number;
}
const Row_SubRecipeSubInfo: React.FC<Row_SubRecipeSubInfoProps> = ({
  className = "",
  subRecipeId,
}) => {
  return (
    <Table_Cell
      className=""
      firstCol={false}
      header={false}
      type="controls"
      rowNum={subRecipeId}
      iconName=""
      key={"Row_SubRecipeSubInfoProps"}
    >
      <Table_Cell className="" type="plating" iconName="" key={data.components[subRecipeId].name}>
        <span className=" text-white text-lg line-clamp-2 leading-none">
          {data.components[subRecipeId].name}
        </span>
      </Table_Cell>

      <div className="">
        <Pill tone="white" className=" text-xs" iconName="" edit="" onClick={() => {}}>
          Yield: {data.components[subRecipeId].yield * 100}%
        </Pill>
        <Pill
          tone="white"
          className="max-w-20 line-clamp-1"
          iconName="arrow_drop_down"
          edit=""
          onClick={() => {}}
        >
          Version
          {/* {data.components[subRecipeId].version} */}
        </Pill>
      </div>
    </Table_Cell>
  );
};

export default Row_SubRecipeSubInfo;
