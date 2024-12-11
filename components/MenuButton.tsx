"use client";

import { useModelMenu } from "@/contexts/UseMenuModal";
import React, { ReactElement, ReactNode } from "react";

type MenuOption = {
  name: string;
  handler: () => void;
};

interface MenuButtonProps {
  options: MenuOption[];
  children: React.ReactNode;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ options, children }) => {
  const { buttonRef, handleClick, buttonPosition } = useModelMenu(options);
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="bg-white hover:bg-white text-black py-0 px-0 rounded"
    >
      {children}
    </button>
  );
};
