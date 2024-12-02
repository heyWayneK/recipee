import React, { ReactNode } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";

interface PillProps {
  children?: ReactNode;
  className?: string;
  iconName?: allowedIcon | "";
  edit?: editOption | "";
  tone?: toneOption;
}
export type toneOption = (typeof toneOptions)[number];
const toneOptions = ["white", "dark", "clear"] as const;

export type editOption = (typeof editOptions)[number];
const editOptions = ["edit", "save", "options"] as const;

const Pill: React.FC<PillProps> = ({
  children,
  className = "",
  iconName = "",
  edit = "",
  tone = "clear",
}) => {
  return (
    <div className="relative">
      <div
        className={`text-nowrap ${className} ${
          tone === "dark" && "bg-black text-white"
        } ${
          tone === "white" && "bg-white text-black"
        }  min-w-10 border px-2 py-1 rounded-full border-slate-400 flex items-center gap-x-1 cursor-pointer select-none h-full
      ${
        edit !== "" &&
        "before:content-['...'] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-1px]"
      }
      `}
      >
        {iconName && (
          <SvgSprite
            className={`${tone === "dark" ? "fill-white" : "fill-black"}`}
            size={16}
            iconName={iconName}
          />
        )}
        {children}
      </div>
      <div
        id="icon"
        className="absolute flex place-items-center justify-center top-0 left:50px hover:bg-white/80 active:bg-white rounded-full w-full h-full 
        [&>svg]:rounded-full 
        [&>svg]:invisible [&>svg]:hover:visible
        [&>svg]:bg-primary-400
        [&>svg]:shadow-shadow1
        [&>svg]:m-1"
      >
        {edit === "edit" && (
          <SvgSprite className="" size={20} iconName="edit" />
        )}
        {edit === "save" && <SvgSprite size={20} iconName="save" />}
        {edit === "options" && (
          <SvgSprite size={20} iconName="arrow_drop_down" />
        )}
      </div>
    </div>
  );
};

export default Pill;

// ${edit === "edit" && "after:content-['✏️']"}
// ${edit === "save" && "after:content-['⭐️']"}
// ${edit === "options" && "after:content-['270E']"}
