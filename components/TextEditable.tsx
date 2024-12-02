import React, { ReactNode } from "react";
import SvgSprite from "./SvgSprite";

interface TextEditableProps {
  children?: ReactNode;
  className?: string;
}

const TextEditable: React.FC<TextEditableProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className="relative">
      <span
        className={`${className}
         text-slate-700 text-pretty overflow-auto text-ellipsis rounded-xl min-w-10 px-4 py-1 gap-x-1 cursor-pointer select-none hover:rounded-md 
      `}
      >
        {children}
      </span>
      <div
        id="icon"
        className={`absolute flex place-items-center justify-center top-0 left:50px hover:bg-white/80 active:bg-white rounded-lg w-full h-full border-white border hover:border-slate-200
        [&>svg]:rounded-lg
        [&>svg]:invisible [&>svg]:hover:visible
        [&>svg]:bg-primary-400
        [&>svg]:shadow-shadow1
        [&>svg]:m-1
        `}
      >
        <SvgSprite size={20} iconName="edit" />
      </div>
      <div className="absolute right-0 top-0">
        <SvgSprite className=" fill-slate-300" size={15} iconName="edit" />
      </div>
    </div>
  );
};

export default TextEditable;
