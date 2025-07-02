"use client";

import { MenuButton } from "@/components/MenuButton";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MenuOption1: React.FC<Props> = ({ children }) => {
  const menuOptions = [
    { jsx: <div>Option 1 - 2</div>, handler: () => console.log("Option 1 clicked - 2") },
    { jsx: <div>Option 2 - 2</div>, handler: () => console.log("Option 2 clicked - 2") },
  ];

  return (
    <MenuButton className=" px-2 py-1" options={menuOptions}>
      {children}
    </MenuButton>
  );
};

export default MenuOption1;
