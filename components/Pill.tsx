import React, { ReactNode } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";

interface PillProps {
  children?: ReactNode;
  className?: string;
  iconName?: allowedIcon | "";
  edit?: editOption | "";
  tone?: toneOption;
  onClick?: () => void;
}
export type toneOption = (typeof toneOptions)[number];
const toneOptions = ["white", "dark", "clear"] as const;

export type editOption = (typeof editOptions)[number];
const editOptions = ["edit", "save", "options"] as const;

const Pill: React.FC<PillProps> = ({ children, className = "", iconName = "", edit = "", tone = "clear", onClick }) => {
  return (
    <div className="relative h-full" onClick={onClick}>
      <div
        className={`text-nowrap ${className} ${tone === "dark" && "bg-black text-white"} ${
          tone === "white" && " text-black "
        }  min-w-10 border px-2 py-1 h-full rounded-full border-slate-500 flex items-center gap-x-1 cursor-pointer select-none 
      ${edit !== "" && "before:content-['...'] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-1px]"}
      `}
      >
        {iconName && <SvgSprite className={`${tone === "dark" ? "fill-white" : "fill-black"}`} size={16} iconName={iconName} />}
        {children}
      </div>
      <div
        id="icon"
        className="absolute  top-0 left:50px rounded-full w-full h-full 
        [&>svg]:rounded-full 
        [&>svg]:invisible 
        [&>svg]:bg-primary-400
        [&>svg]:shadow-shadow1
        [&>svg]:m-1"
      >
        {/* TODO: if clickable " hover:bg-white/80 active:bg-white [&>svg]:hover:visible" */}
        {edit === "edit" && <SvgSprite className="" size={20} iconName="edit" />}
        {edit === "save" && <SvgSprite size={20} iconName="save" />}
        {edit === "options" && <SvgSprite size={20} iconName="arrow_drop_down" />}
      </div>
    </div>
  );
};

export default Pill;

// ${edit === "edit" && "after:content-['✏️']"}
// ${edit === "save" && "after:content-['⭐️']"}
// ${edit === "options" && "after:content-['270E']"}
