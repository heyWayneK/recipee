import React, { ReactNode } from "react";

interface DottedBorderProps {
  children: ReactNode;
  className?: string;
}
const DottedBorder: React.FC<DottedBorderProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`${className} overflow-hidden w-full rounded-3xl p-3 border border-dotted border-slate-600 shadow-md`}
    >
      {children}
    </div>
  );
};

export default DottedBorder;
