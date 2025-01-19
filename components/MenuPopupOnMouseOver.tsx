"use client";

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement } from "react";

export interface MenuOptionsProps {
  jsx: ReactElement;
  handler?: () => void;
  selectedId?: number;
  id?: number;
}

interface Props {
  children: React.ReactNode;
  menuArray: MenuOptionsProps[];
  type?: "onClick" | "onMouseOver";
}

const MenuDynamicChildren: React.FC<Props> = ({ children, menuArray, type = "onClick" }) => {
  return (
    // <MenuButton type={type} options={menuOptions}>
    <MenuButton type={type} options={menuArray}>
      {children}
    </MenuButton>
  );
};

export default MenuDynamicChildren;

// const menuArray: MenuOptionsProps[] = [
//   { name: <span>Option 1 - 2</span>, handler: () => console.log("Option 1 clicked ") },
//   { name: <span>Option 2 - 2</span>, handler: () => console.log("Option 2 clicked ") },
//   { name: <span>Option 3 - 2</span>, handler: () => console.log("Option 3 clicked ") },
// ];
