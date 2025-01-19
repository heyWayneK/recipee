"use client";

import { MenuButton } from "@/components/MenuButton";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MenuOption1: React.FC<Props> = ({ children }) => {
  const menuOptions = [
    { name: "Option 1 - 2", handler: () => console.log("Option 1 clicked ") },
    { name: "Option 2 - 2", handler: () => console.log("Option 2 clicked ") },
    { name: "Option 3 - 2", handler: () => console.log("Option 3 clicked ") },
  ];

  return <MenuButton options={menuOptions}>{children}</MenuButton>;
};

export default MenuOption1;
