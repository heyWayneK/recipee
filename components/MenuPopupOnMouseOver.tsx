"use client";

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement } from "react";

interface MenuOptionsProps {
  name: string;
  handler?: () => void;
}

interface Props {
  children: React.ReactNode;
  menuArray: any[];
  type?: "onClick" | "onMouseOver";
  // menuArray: MenuOptionsProps[];
  // menuArray: string[];
}

const MenuDynamicChildren: React.FC<Props> = ({ children, menuArray, type = "onClick" }) => {
  const menuOptions = menuArray.map((option) => ({
    name: option,
    handler: () => {}, // Default handler if not provided
  }));

  return (
    <MenuButton key={Math.random()} type={type} options={menuOptions}>
      {children}
    </MenuButton>
  );
};

export default MenuDynamicChildren;

// const menuOptions = [
//   { name: "Option 1 - 2", handler: () => console.log("Option 1 clicked ") },
//   { name: "Option 2 - 2", handler: () => console.log("Option 2 clicked ") },
//   { name: "Option 3 - 2", handler: () => console.log("Option 3 clicked ") },
// ];
