import React, { ReactNode } from "react";

interface Table_DynamicTableColsProps {
  children: ReactNode;
  className?: string;
  colLengthArray: number;
}
const Table_DynamicTableCols: React.FC<Table_DynamicTableColsProps> = ({ children, className = "", colLengthArray }) => {
  return (
    <div
      key={"dynamicTableCols"}
      // DYNAMICALLY CREATE COLUMNS
      className={`grid justify-center gap-y-2 md:gap-x-2 gap-x-1  ${className}`}
      style={{ gridTemplateColumns: `2fr repeat(${colLengthArray}, min-content)` }}
    >
      {children}
    </div>
  );
};

export default Table_DynamicTableCols;
