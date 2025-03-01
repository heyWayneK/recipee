import React, { ReactNode, useEffect, useRef, useState } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";
import { recipeColors } from "@/libs/colorsRecipes";

// TODO: EXAMPLE: TAILWIND MERGE
// import { tailwindMerge } from "@/utils/tailwindMerge";
// className={tailwindMerge("mb-2 p-3 overflow-hidden w-full rounded-3xl border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch", className)}

interface Table_CellProps {
  children?: ReactNode;
  className?: string;
  iconName?: allowedIcon | "";
  edit?: editOption;
  type?: typeOption;
  header?: boolean;
  rowNum?: string | number;
  firstCol?: boolean;
  onClick?: () => void;
  trackChangeVisually?: boolean;
  trackChangesStorageName?: string;
}
export type typeOption = (typeof typeOptions)[number];
const typeOptions = ["clear", "plating", "text", "plating_list", "sub_total", "total", "print", "controls", "ingredient", "sub_recipe", "step", "method"] as const;

export type editOption = (typeof editOptions)[number];
const editOptions = ["edit", "save", "options"] as const;
//+ rowNum + " "
const Table_Cell: React.FC<Table_CellProps> = ({
  children,
  className = "",
  iconName = "",
  edit = "",
  type = "text",
  header = false,
  rowNum = null,
  firstCol = false,
  onClick = () => {},
  trackChangeVisually = false,
  trackChangesStorageName = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isUpdated, setIsUpdated] = useState(false);
  // const previousChildren = useRef<ReactNode>(null);
  let previousChildren = localStorage.getItem(`${trackChangesStorageName}-${rowNum}`);

  useEffect(() => {
    // SHOW CSS ANIMATION WHEN VALUE CHAMGES
    if (trackChangeVisually) {
      // NB: Convert children to a string for comparison, assuming children will be simple text or numbers.
      const currentChildren = children ? children.toString() : "";
      // console.log("}}}}}}}", typeof previousChildren.current);
      if (previousChildren !== currentChildren) {
        // if (previousChildren.current !== currentChildren) {
        // if (typeof previousChildren.current !== null) {
        elementRef.current?.classList.add("rotating-outline");
        setInterval(() => {
          elementRef.current?.classList.remove("rotating-outline");
        }, 1500);
        // }

        // console.log("prev:", previousChildren.current);
        // console.log("curr", currentChildren);
        // console.log(isUpdated);
        // console.log("__________________________");
        // console.log(" ");
        // Store the new value for next comparison
        previousChildren = currentChildren;
        // previousChildren.current = currentChildren;
        // Save to localStorage if needed
        // if (trackChangesStorageName && rowNum !== null) {
        localStorage.setItem(`${trackChangesStorageName}-${rowNum}`, currentChildren);
        // }
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    }
  }, [children, trackChangeVisually, trackChangesStorageName, rowNum]);

  return (
    <div
      ref={elementRef}
      onClick={onClick}
      className={`relative grid
      ${type === "controls" ? "col-span-full border-0 rounded-full" : ""}
      ${type === "method" ? "col-span-full " : ""}
      ${type === "step" ? "col-span-full" : ""}
      `}
    >
      <div
        style={{
          backgroundColor: `${trackChangeVisually || (recipeColors["r" + rowNum] ?? "")}`,
          borderColor: `${trackChangeVisually || (recipeColors["r" + rowNum] ?? "")}`,
        }}
        // STYLE OPTIONS : Do I need:cursor-pointer select-none
        //TODO:text-nowrap - do we need this?
        className={`
        text-xs
        px-3 py-[6px]
        cursor-pointer select-none

        ${
          type === "plating"
            ? " !text-sm border grid grid-flow-col items-center text-nowrap justify-items-center gap-x-2 rounded-full text-black selection:border-none  hover:opacity-50 active:opacity-30 shadow-md"
            : ""
        } 
        
        ${type === "controls" ? " grid grid-flow-col justify-between items-center rounded-full [&>*]:grid [&>*]:grid-flow-col [&>*]:gap-x-2" : ""} 

        ${type === "plating_list" ? "  !justify-start text-nowrap  text-white border-5 rounded-full hover:opacity-60 active:opacity-75" : ""}

        ${type === "sub_total" ? " border-t border-b border-black font-medium !text-black " : ""}  

        ${type === "total" ? " border-b-4 border-double border-black font-bold !text-black " : ""}  

        ${type === "print" ? " " : ""}  

        ${type === "method" ? " grid grid-flow-col  self-start [&>*]:items-start " : ""}  

        ${type === "ingredient" ? " grid grid-flow-col rounded-full bg-slate-200 truncate line-clamp-1 md:line-clamp-none md:text-wrap !text-black  active:bg-slate-300" : ""} 
        
        ${type === "sub_recipe" ? "  " : ""} 
        
        ${type === "step" ? " !text-black !justify-start" : ""} 
        
        ${edit !== "" ? " before:content-['...'] hover:opacity-50  hover:z-[100] before:opacity-55 before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[2px] " : ""}
        ${
          type === "clear"
            ? " rounded-full border border-slate-400 grid-flow-col justify-center gap-x-2 [&>div]:text-black hover:opacity-50 active:opacity-30 justify-items-center !text-black [&>svg]:fill-black"
            : ""
        }
        ${className}
        
        ${firstCol ? " font-semibold grid uppercase text-[0.6rem] sm:text-xs content-center  text-white !line-clamp-1 " : " text-black "}

        ${header ? " font-medium text-base bg-black text-white border rounded-full justify-center justify-items-center text-center" : " justify-center justify-items-center text-center text-black "}
        } 

        ${type === "text" ? " opacity-80 active:opacity-30 !text-black " : ""} 

        `}
        // ${isUpdated && "rotating-outline"}
      >
        {iconName && <SvgSprite className={`${header ? "fill-white" : "fill-black"}`} size={16} iconName={iconName} />}
        {children}
      </div>
      <div
        id="icon"
        className=" flex place-items-center justify-center top-0 left:50px active:bg-white rounded-full 
      "
      ></div>
    </div>
  );
};

export default Table_Cell;

// ${edit === "edit" && "after:content-['✏️']"}
// ${edit === "save" && "after:content-['⭐️']"}
// ${edit === "options" && "after:content-['270E']"}
