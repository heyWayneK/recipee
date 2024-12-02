import { Pill } from "lucide-react";
import React from "react";

interface Row_HeadingProps {
  data: any;
  className?: string;
}
const Row_Heading: React.FC<Row_HeadingProps> = ({ className = "", data }) => {
  return (
    // ASSEMBLY
    <div className={`${className} p-1`}>
      <Pill />
    </div>
  );
};

export default Row_Heading;
