"use client";

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement } from "react";

interface MenuOptionsProps {
  name: string;
  handler?: () => void;
}

interface Props {
  children: React.ReactNode;
  menuArray: [];
  // menuArray: MenuOptionsProps[];
  // menuArray: string[];
}

const MenuPopupDynamic: React.FC<Props> = ({ children, menuArray }) => {
  const menuOptions = menuArray.map((option) => ({
    name: option,
    handler: () => {}, // Default handler if not provided
  }));

  return <MenuButton options={menuOptions}>{children}</MenuButton>;
};

export default MenuPopupDynamic;

// const menuOptions = [
//   { name: "Option 1 - 2", handler: () => console.log("Option 1 clicked ") },
//   { name: "Option 2 - 2", handler: () => console.log("Option 2 clicked ") },
//   { name: "Option 3 - 2", handler: () => console.log("Option 3 clicked ") },
// ];