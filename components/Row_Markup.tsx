import { Pill } from "lucide-react";
import React from "react";

interface Row_MarkupProps {
  data: any;
  className?: string;
}
const Row_Markup: React.FC<Row_MarkupProps> = ({ className = "", data }) => {
  return (
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_Markup;
