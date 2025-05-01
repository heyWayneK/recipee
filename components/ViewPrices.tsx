import React, { ReactNode } from "react";

interface ViewPricesProps {
  children: ReactNode;
  viewPrices: boolean;
}
const ViewPrices: React.FC<ViewPricesProps> = ({ children, viewPrices = false }) => {
  return viewPrices && <div className="text-[10px] self-center">{children}</div>;
};

export default ViewPrices;
