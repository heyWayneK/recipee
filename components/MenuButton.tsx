"use client";

import { useModelMenu } from "@/contexts/UseMenuModal";
import React from "react";

type MenuOption = {
  name: string;
  handler: () => void;
};

interface MenuButtonProps {
  options: MenuOption[];
  buttonText: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ options, buttonText }) => {
  const { buttonRef, handleClick, buttonPosition } = useModelMenu(options);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {buttonText}
    </button>
  );
};
