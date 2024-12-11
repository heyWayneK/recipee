import React, { ReactNode } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";
import { recipeColors } from "@/lib/colorsRecipes";

interface Table_CellProps {
  children?: ReactNode;
  className?: string;
  iconName?: allowedIcon | "";
  edit?: editOption;
  type?: typeOption;
  header?: boolean;
  rowNum?: string | number;
  firstCol?: boolean;
}
export type typeOption = (typeof typeOptions)[number];
const typeOptions = [
  "plating",
  "text",
  "component",
  "sub_total",
  "total",
  "print",
  "controls",
  "method",
  "ingredient",
  "sub_recipe",
  "step",
  "method",
] as const;

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
  rowNum = "",
  firstCol = false,
}) => {
  return (
    <div
      className={`relative 
      ${type === "controls" ? "col-span-full border rounded-full" : ""}
      ${type === "method" ? "col-span-full" : ""}
      ${type === "step" ? "col-span-full" : ""}
      `}
    >
      <div
        style={{
          backgroundColor: `${rowNum !== undefined ? recipeColors["r" + rowNum] : "red"}`,
          borderColor: `${
            rowNum !== undefined ? (firstCol ? "" : recipeColors["r" + rowNum]) : ""
          }`,
        }}
        // STYLE OPTIONS : Do I need:cursor-pointer select-none
        //TODO:text-nowrap - do we need this?
        className={`
        text-xs leading-none
        px-3 py-[6px]
        cursor-pointer select-none
        overflow-hidden
     

        ${type === "text" ? " opacity-80 hover:opacity-50 active:opacity-30" : ""} 

        ${
          type === "controls"
            ? " grid grid-flow-col justify-between items-center rounded-full [&>*]:grid [&>*]:grid-flow-col [&>*]:gap-x-2"
            : ""
        }

        ${
          type === "plating"
            ? " grid-flow-col items-center justify-start gap-x-2 border-none  hover:opacity-50 active:opacity-30 "
            : ""
        } 

        ${
          type === "component"
            ? " text-white border-1 rounded-full hover:opacity-60 active:opacity-75"
            : ""
        }

        ${type === "sub_total" ? " border-t border-b border-black font-medium" : ""}  

        ${type === "total" ? " border-b-4 border-double border-black font-bold " : ""}  

        ${type === "print" ? " " : ""}  
        ${
          type === "ingredient"
            ? " grid grid-flow-col items-center  rounded-full bg-slate-200 "
            : ""
        } 

        ${type === "sub_recipe" ? "  " : ""} 

        ${type === "step" ? " " : ""} 

        ${
          edit !== ""
            ? " before:content-['...'] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-1px] "
            : ""
        }
        ${
          header
            ? " font-medium text-base bg-black text-white border rounded-full border-slate-400 "
            : ""
        }
         
        ${
          firstCol
            ? " font-semibold grid justify-left uppercase text-[0.6rem] sm:text-xs"
            : " justify-center marker:"
        } 

        ${className}
       
      `}
      >
        {iconName && (
          <SvgSprite
            className={`${header ? "fill-white" : "fill-black"}`}
            size={16}
            iconName={iconName}
          />
        )}
        {children}
      </div>
      <div
        id="icon"
        className=" flex place-items-center justify-center top-0 left:50px active:bg-white rounded-full 
      "
      >
        {/* 
        hover:bg-white/80
        
        [&>svg]:rounded-full 
      [&>svg]:invisible [&>svg]:hover:visible
      [&>svg]:bg-primary-400
      [&>svg]:shadow-shadow1
      [&>svg]:m-1 */}
        {edit === "edit" && <SvgSprite className="" size={20} iconName="edit" />}
        {edit === "save" && <SvgSprite size={20} iconName="save" />}
        {edit === "options" && <SvgSprite size={20} iconName="arrow_drop_down" />}
      </div>
    </div>
  );
};

export default Table_Cell;

// ${edit === "edit" && "after:content-['✏️']"}
// ${edit === "save" && "after:content-['⭐️']"}
// ${edit === "options" && "after:content-['270E']"}
