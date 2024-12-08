// YourComponent.tsx
import { useModalMenu } from "@/contexts/UseMenuModal";
import React, { useRef } from "react";

const MenuOption1: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { showMenu } = useModalMenu();

  const handleSomething = (item: string) => {
    console.log(`Selected item: ${item}`);
  };

  const menuItems = ["Option 1", "Option 2", "Option 3"];

  return (
    <button
      ref={buttonRef}
      onClick={(event) => showMenu(event, buttonRef, menuItems, handleSomething)}
    >
      Open Menu
    </button>
  );
};

export default MenuOption1;
