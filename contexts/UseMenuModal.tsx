"use client";

import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from "react";

type MenuOption = {
  name: string;
  handler: () => void;
};

type ModalPosition = {
  top: number;
  left: number;
};

interface MenuModalContextType {
  openMenu: (options: MenuOption[], buttonRect: DOMRect) => void;
  closeMenu: () => void;
}

const MenuModalContext = createContext<MenuModalContextType | undefined>(undefined);

export const MenuModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<MenuOption[]>([]);
  const [position, setPosition] = useState<ModalPosition>({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback((newOptions: MenuOption[], buttonRect: DOMRect) => {
    setOptions(newOptions);

    const modalPosition: ModalPosition = {
      top: buttonRect.bottom,
      left: buttonRect.left,
    };

    // Adjust position if it would render off-screen
    if (modalPosition.left + 200 > window.innerWidth) {
      // Assuming modal width of 200px
      modalPosition.left = window.innerWidth - 200;
    }

    setPosition(modalPosition);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, closeMenu]);

  return (
    <MenuModalContext.Provider value={{ openMenu, closeMenu }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50" style={{ pointerEvents: "none" }}>
          <div
            ref={modalRef}
            className="absolute bg-white rounded-lg shadow-lg p-4"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              pointerEvents: "auto",
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  option.handler();
                  closeMenu();
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </MenuModalContext.Provider>
  );
};

export const useMenuModal = () => {
  const context = useContext(MenuModalContext);
  if (context === undefined) {
    throw new Error("useMenuModal must be used within a MenuModalProvider");
  }
  return context;
};

// HOOK
export const useModelMenu = (options: MenuOption[]) => {
  const { openMenu } = useMenuModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);

  const updateButtonPosition = useCallback(() => {
    if (buttonRef.current) {
      setButtonPosition(buttonRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    updateButtonPosition();
    window.addEventListener("scroll", updateButtonPosition);
    window.addEventListener("resize", updateButtonPosition);

    return () => {
      window.removeEventListener("scroll", updateButtonPosition);
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, [updateButtonPosition]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (buttonPosition) {
        openMenu(options, buttonPosition);
      }
    },
    [options, openMenu, buttonPosition]
  );

  return { buttonRef, handleClick, buttonPosition };
};

/* USAGE

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement } from "react";

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


*/
