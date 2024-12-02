import { Pill } from "lucide-react";
import React from "react";

interface Row_IngredientCostProps {
  data: any;
  className?: string;
}
const Row_IngredientCost: React.FC<Row_IngredientCostProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_IngredientCost;
