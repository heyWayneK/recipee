import { tailwindMerge } from "@/utils/tailwindMerge";
import React, { ReactNode } from "react";

interface DottedBorderProps {
  children: ReactNode;
  className?: string;
}
const DottedBorder: React.FC<DottedBorderProps> = ({ children, className = "" }) => {
  return (
    <div
      key={"dottedBorder"}
      className={tailwindMerge(
        "text-base-content mb-2 p-3 overflow-hidden w-full rounded-3xl border-2 border-dotted border-primary-200/40 shadow-md grid grid-cols-1 justify-center items-stretch",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DottedBorder;
