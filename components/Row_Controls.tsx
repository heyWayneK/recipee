import React, { ReactNode } from "react";

interface Row_ControlsProps {
  children: ReactNode;
  className?: string;
}
const Row_Controls: React.FC<Row_ControlsProps> = ({ children, className = "" }) => {
  return <div className={`className p-1`}>{children}</div>;
};

export default Row_Controls;
