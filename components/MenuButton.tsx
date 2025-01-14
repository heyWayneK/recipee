"use client";

import { useModalMenu } from "@/contexts/UseMenuModal";
import React from "react";

type MenuOption = {
  name: string;
  handler: () => void;
};

interface MenuButtonProps {
  options: MenuOption[];
  children: React.ReactNode;
  type?: "onClick" | "onMouseOver";
}

export const MenuButton: React.FC<MenuButtonProps> = ({ options, children, type = "onClick" }) => {
  const { buttonRef, handleClick, buttonPosition, closeMenu } = useModalMenu(options);

  // if (buttonRef.current) {
  //   buttonRef.current.style.backgroundColor = "lime";
  // }
  return (
    <>
      {type === "onMouseOver" ? (
        <button ref={buttonRef} onMouseOver={handleClick} onMouseOut={closeMenu} className="  bg-white text-black py-0 px-0 rounded-full">
          {children}
        </button>
      ) : (
        <button ref={buttonRef} onClick={handleClick} className="   bg-white hover:bg-white text-black py-0 px-0 rounded-full">
          {children}
        </button>
      )}
    </>
  );
};
