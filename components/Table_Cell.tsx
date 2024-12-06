import React, { ReactNode } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";
import { recipeColors } from "@/lib/colorsRecipes";

interface Table_CellProps {
  children?: ReactNode;
  className?: string;
  iconName?: allowedIcon | "";
  edit?: editOption | "";
  type?: typeOption | "";
  header?: boolean;
  rowNum?: string | number;
  firstCol?: boolean;
}
export type typeOption = (typeof typeOptions)[number];
const typeOptions = ["component", "sub_total", "total", "print", "controls"] as const;

export type editOption = (typeof editOptions)[number];
const editOptions = ["edit", "save", "options"] as const;
//+ rowNum + " "
const Table_Cell: React.FC<Table_CellProps> = ({
  children,
  className = "",
  iconName = "",
  edit = "",
  type = "",
  header = false,
  rowNum = "",
  firstCol = false,
}) => {
  return (
    <div
      className={` relative line-clamp-1 overflow-ellipsis justify-items-center ${
        type === "controls" && "col-span-full border rounded-full "
      } `}
    >
      <div
        // COMPONENT AUTO COLOR
        style={{
          backgroundColor: `${recipeColors["r" + rowNum]}`,
          borderColor: `${recipeColors["r" + rowNum]}`,
        }}
        // STYLE OPTIONS : Do I need:cursor-pointer select-none
        className={`
        text-sm text-nowrap leading-none
        grid grid-flow-col gap-x-1 
        px-2 py-[8px] h-full
        cursor-pointer select-none
        
        ${
          type === "controls" &&
          "text-black col-span-full border rounded-full border-white place-items-end "
        } 
        ${type === "component" && "text-white border rounded-full "} 
        ${type === "sub_total" && "border-t border-b border-black font-medium"}  
        ${type === "total" && "  border-b-4 border-double border-black font-bold "}  
        ${
          header &&
          " font-semibold text-base justify-center bg-black text-white border rounded-full border-slate-400 "
        }
        ${firstCol && " font-semibold uppercase justify-self-stretch "}  
        ${type === "print" && " "}  
        ${
          edit !== "" &&
          " before:content-['...'] before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[-1px] "
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
        className=" flex place-items-center justify-center top-0 left:50px  active:bg-white rounded-full w-full h-full 
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
