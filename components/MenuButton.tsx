"use client";

import { useModalMenu } from "@/contexts/UseMenuModal";
import React, { ComponentProps } from "react";
import { MenuOptionsProps } from "./MenuPopupOnMouseOver";

// type MenuOption
//   extends ComponentProps<"div"> {
//     // VariantProps<typeof pillVariants> {
//   name: string;
//   handler: () => void;
//     };

//     export interface PillProps
//   // ComponentProps includes standard HTML div props e.g onClick
//   extends ComponentProps<"div">,
//     VariantProps<typeof pillVariants> {
//   iconName?: allowedIcon;
//   iconPosition?: "left" | "right";
//   edit?: "edit" | "save" | "options" | ""; // Optional edit state
// }

interface MenuOption {
  name: string;
  handler: () => void;
}

interface MenuButtonProps
  // ComponentProps includes standard HTML div props e.g onClick
  extends ComponentProps<"div"> {
  // options: MenuOption[];
  options: MenuOptionsProps[];
  children: React.ReactNode;
  type?: "onClick" | "onMouseOver";
}

export const MenuButton: React.FC<MenuButtonProps> = ({ options, children, type = "onClick" }) => {
  const { buttonRef, handleClick, buttonPosition, closeMenu } = useModalMenu(options);

  return (
    <>
      {/* CREATE A MOUSEOVER OR MOUSEDOWN COMPONENT */}
      {/* {type === "onMouseOver" ? (
        <button ref={buttonRef} onMouseOver={handleClick} onMouseOut={closeMenu} className=" bg-white text-black py-0 px-0 rounded-full">
          {children}
        </button>
      ) : ( */}
      <button ref={buttonRef} onClick={handleClick} className="flex place-content-center place-items-center">
        {children}
      </button>
      {/* )} */}
    </>
  );
};
