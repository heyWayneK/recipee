import { Pill } from "lucide-react";
import React from "react";

interface Row_PackagingCostProps {
  data: any;
  className?: string;
}
const Row_PackagingCost: React.FC<Row_PackagingCostProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_PackagingCost;
