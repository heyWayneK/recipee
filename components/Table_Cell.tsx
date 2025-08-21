import React, { useEffect, useRef, useState, ComponentProps } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";
import { recipeColors } from "@/libs/colorsRecipes";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import TextEditable from "./TextEditable";
import { useModalBig } from "@/hooks/UseBigModal";

// USING CVA to create Prop types for the Table_Cell component
const cellVariants = cva(" px-2 md:px-4 py-[6px] cursor-pointer select-none items-center ", {
  variants: {
    firstCol: {
      // First Row
      true: "flex flex-grow flex-shrink font-normal uppercase justify-items-start  line-clamp-1 ",
    },
    type: {
      plating: "flex justify-center items-baseline border text-nowrap gap-x-2 rounded-full bg-base-100/40 shadow-md [&>svg]:fill-base-content [&>svg]:size [&>svg]:text-base-content capitalize ",

      plating_list: "text-nowrap rounded-full hover:opacity-60 active:opacity-75 text-primary-50  ",

      controls: " grid grid-flow-col justify-between items-center rounded-full [&>*]:grid [&>*]:grid-flow-col [&>*]:gap-x-2",

      sub_total: "border-t border-b border-base-content justify-center text-center",

      total: " border-b-4 border-double border-t-2 border-base-content ",

      print: "grid inset-0 justify-items-center content-stretch place-items-end h-full w-full",

      method: " grid grid-flow-col  self-start [&>*]:items-start ",

      ingredient: "grid grid-flow-col rounded-full bg-base-content/10 truncate line-clamp-1 md:line-clamp-none md:text-wrap active:bg-neutral-content place-items-center",

      sub_recipe: "  ",

      step: " justify-start [&>svg]:fill-base-content [&>svg]:size",

      clear:
        " rounded-full border border-neutral-content grid-flow-col justify-center gap-x-2 [&>div]:text-base-content hover:opacity-50 active:opacity-30 justify-items-center  [&>svg]:fill-base-content",

      header: " text-base-content border rounded-full justify-center justify-items-center text-center capitalize self-baseline font-semibold",

      text: " flex bg-base-content/10 text-base-content rounded-full justify-center justify-items-center capitalize ",

      admin: "bg-secondary-200 font-semibold rounded-full ",
    },

    edit: {
      edit: " hover:animate-popup  before:content-['...']  hover:z-[100] before:opacity-55 before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[2px]  ",

      save: " ",

      options: " ",
    },
  },
  // compoundVariants: [
  //   {
  //     edit: ["edit", "save", "options"],
  //     className: "before:content-['...'] hover:opacity-50  hover:z-[100] before:opacity-55 before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[2px]",
  //   },
  // ],
  // {
  //   edit: ["edit", "save", "options"],
  //   className: "before:content-['...'] hover:opacity-50  hover:z-[100] before:opacity-55 before:absolute before:left-[50%] before:translate-x-[-50%] before:bottom-[2px]",
  // },

  // ],
  defaultVariants: {
    //e.g.  tone: "white",
  },
});

interface Table_CellProps extends ComponentProps<"div">, VariantProps<typeof cellVariants> {
  iconName?: allowedIcon | "";
  header?: boolean;
  rowNum?: string | number;
  trackChangeVisually?: boolean;
  trackChangesStorageName?: string;
  dbDataId?: string; // the database row id for updates
}

export type typeOption = (typeof typeOptions)[number];
const typeOptions = ["clear", "plating", "text", "plating_list", "sub_total", "total", "print", "controls", "ingredient", "sub_recipe", "step", "method", "admin"] as const;

export type editOption = (typeof editOptions)[number];
const editOptions = ["edit", "save", "options"] as const;
//+ rowNum + " "
const Table_Cell: React.FC<Table_CellProps> = ({
  children,
  className = "",
  iconName = "",
  edit = null,
  type = "text",
  header = false,
  rowNum = null,
  firstCol = false,
  trackChangeVisually = false,
  trackChangesStorageName = "",
  dbDataId = undefined,
  ...props
}) => {
  const { openModal } = useModalBig();

  const elementRef = useRef<HTMLDivElement>(null);
  const [isUpdated, setIsUpdated] = useState(false);
  let previousChildren = localStorage.getItem(`${trackChangesStorageName}-${rowNum}`);

  useEffect(() => {
    // SHOW CSS ANIMATION WHEN VALUE CHANGES
    if (trackChangeVisually) {
      if (typeof rowNum !== "number" || rowNum < 0) {
        console.error(`Table_Cell: rowNum is required as prop when trackChangeVisually=true. rowNum ${rowNum} is not valid.`);
      }
      // NB: Convert children to a string for comparison, assuming children will be simple text or numbers.
      const currentChildren = children ? children.toString() : "";
      if (previousChildren !== currentChildren) {
        elementRef.current?.classList.add("rotating-outline");
        setInterval(() => {
          elementRef.current?.classList.remove("rotating-outline");
        }, 1500);
        // }

        previousChildren = currentChildren;
        // Store the current children in localStorage for this row
        localStorage.setItem(`${trackChangesStorageName}-${rowNum}`, currentChildren);
        setIsUpdated(true);
      } else {
        setIsUpdated(false);
      }
    }
  }, [children, trackChangeVisually, trackChangesStorageName, rowNum]);

  return (
    <div
      ref={elementRef}
      className={`relative grid
      ${type === "controls" ? "col-span-full border-0 rounded-full" : ""}
      ${type === "method" ? "col-span-full " : ""}
      ${type === "step" ? "col-span-full pl-3" : ""}
      `}
    >
      {/* RECIPE UNIQUE COLOURS */}
      <div
        // onClick={edit === "edit" ? () => handleOpenModal() : undefined}
        style={
          (type === "plating_list" || type === "controls") && typeof rowNum === "number"
            ? {
                backgroundColor: `${recipeColors["r" + rowNum] ?? ""}`,
                borderColor: `${recipeColors["r" + rowNum] ?? ""}`,
              }
            : {}
        }
        // STYLE OPTIONS : Do I need:cursor-pointer select-none
        //TODO:text-nowrap - do we need this?
        {...props}
        className={twMerge(cellVariants({ type, firstCol, edit }), className || "")}
      >
        {iconName && <SvgSprite className={`${header ? "fill-base-content" : "fill-base-100"}`} size={16} iconName={iconName} />}
        {/* TEXT VALUE TO EDIT */}
        {children}
      </div>
    </div>
  );
};

export default Table_Cell;
