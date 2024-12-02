import React, { ReactNode } from "react";
import SvgSprite from "./SvgSprite";

// interface LoadingProps {
// // className?: string
// }
const Loading = () => {
  return (
    <div className="w-full h-full animate-spin relative p-3">
      <SvgSprite
        size={40}
        iconName={"refresh"}
        className="absolute inset-0 m-auto opacity-30"
      />
    </div>
  );
};

export default Loading;
