import React from "react";
import Pill from "./Pill";
import { getTextTranslation } from "@/lib/utils";

interface Row_PlatingHeadingProps {
  className?: string;
}
const Row_PlatingHeading: React.FC<Row_PlatingHeadingProps> = ({ className = "" }) => {
  return (
    // ASSEMBLY
    <div className={`${className} p-2  justify-self-start`}>
      <Pill className=" uppercase text-xs" tone="dark">
        {getTextTranslation("component_assembly")}
      </Pill>
    </div>
  );
};

export default Row_PlatingHeading;
