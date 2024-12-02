import { Pill } from "lucide-react";
import React from "react";

interface Row_SalePriceExVatProps {
  data: any;
  className?: string;
}
const Row_SalePriceExVat: React.FC<Row_SalePriceExVatProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_SalePriceExVat;
