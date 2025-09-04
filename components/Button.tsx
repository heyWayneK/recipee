import React from "react";
import { Button as ShadeCnButton } from "@/components/ui/button";

// Button component
const Button = ({ text, onClick, disabled, isLoading }: { text: string; onClick?: () => void; disabled?: boolean; isLoading?: boolean }) => {
  return (
    <ShadeCnButton
     
      onClick={() => {
        if (onClick) {
          console.log(onClick);
          onClick();
        }
      }}
      // className=" scale-1 hover:scale-[1.05] transition-all duration-300 rounded-full px-8 border-none outline-none focus-visible:ring-0 "
      disabled={disabled || false}
    >
      {isLoading ? <span className="loading loading-spinner loading-xs"></span> : text}
    </ShadeCnButton>
  );
};

export default Button;
