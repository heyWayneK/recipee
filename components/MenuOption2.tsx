"use client";

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MenuOption2: React.FC<Props> = ({ children }) => {
  const menuOptions = [
    { name: "Option 1 - 2", handler: () => console.log("Option 1 clicked - 2") },
    { name: "Option 2 - 2", handler: () => console.log("Option 2 clicked - 2") },
    { name: "Option 3 - 2", handler: () => console.log("Option 3 clicked - 2") },
  ];

  return <MenuButton options={menuOptions}>{children}</MenuButton>;
};

export default MenuOption2;
