import { Pill } from "lucide-react";
import React from "react";

interface Row_OtherCostProps {
  data: any;
  className?: string;
}
const Row_OtherCost: React.FC<Row_OtherCostProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_OtherCost;
