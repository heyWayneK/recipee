import { Pill } from "lucide-react";
import React, { ReactNode } from "react";

interface Row_PrintProps {
  data: any;
  className?: string;
}
const Row_Print: React.FC<Row_PrintProps> = ({ className = "", data }) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_Print;
