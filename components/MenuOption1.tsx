"use client";

import { MenuButton } from "@/components/MenuButton";

export default function Home() {
  const menuOptions = [
    { name: "Option 1", handler: () => console.log("Option 1 clicked") },
    { name: "Option 2", handler: () => console.log("Option 2 clicked") },
    { name: "Option 3", handler: () => console.log("Option 3 clicked") },
  ];

  return <MenuButton options={menuOptions} buttonText="Open Menu" />;
}
