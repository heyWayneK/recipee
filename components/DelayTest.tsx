import React from "react";
import SvgSprite from "./SvgSprite";

// interface LoadingProps {
// // className?: string
// }
const DelayTest = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promise resolved after 2 seconds");
    }, 2000); // 10000 milliseconds = 10 seconds
  });
  return <div className="w-full h-full text-3xl">LOADED</div>;
};

export default DelayTest;
