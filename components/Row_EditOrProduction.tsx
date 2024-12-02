import { Pill } from "lucide-react";
import React from "react";
import SvgSprite from "./SvgSprite";

interface Row_EditOrProductionProps {
  data: any;
  className?: string;
}
const Row_EditOrProduction: React.FC<Row_EditOrProductionProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1 flex gap-5 items-center`}>
      <span>EDIT MODE</span> <SvgSprite iconName="toggle_off" size={50} />
      <span>PRODUCTION MODE</span>
    </div>
  );
};

export default Row_EditOrProduction;
