import React, { ReactNode } from "react";

interface DottedBorderProps {
  children: ReactNode;
  className?: string;
}
const DottedBorder: React.FC<DottedBorderProps> = ({ children, className = "" }) => {
  return (
    <div key={"dottedBorder"} className={` mb-2 ${className} overflow-hidden w-full rounded-3xl p-3 border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch`}>
      {children}
    </div>
  );
};

export default DottedBorder;
