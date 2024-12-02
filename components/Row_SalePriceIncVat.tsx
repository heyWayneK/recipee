import { Pill } from "lucide-react";
import React, { ReactNode } from "react";

interface Row_SalePriceIncVatProps {
  data: any;
  className?: string;
}
const Row_SalePriceIncVat: React.FC<Row_SalePriceIncVatProps> = ({
  className = "",
  data,
}) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_SalePriceIncVat;
