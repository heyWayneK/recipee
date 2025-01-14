"use client";

import React, { createContext, useState, useContext, useCallback, useRef, useEffect, MutableRefObject } from "react";

type MenuOption = {
  name: string;
  handler: () => void;
};

type ModalPosition = {
  top: number;
  left: number;
  width: number;
  right: number;
};

interface MenuModalContextType {
  openMenu: (options: MenuOption[], buttonRect: DOMRect, buttonRef: MutableRefObject<any>) => void;
  closeMenu: () => void;
}

const MenuModalContext = createContext<MenuModalContextType | undefined>(undefined);

export const MenuModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const MENUWIDTH = 200; // px;
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<MenuOption[]>([]);
  const [position, setPosition] = useState<ModalPosition>({ top: 0, left: 0, width: 0, right: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  let buttonClicked: MutableRefObject<HTMLDivElement>;

  const openMenu = useCallback((newOptions: MenuOption[], buttonRect: DOMRect, buttonRef: MutableRefObject<HTMLDivElement>) => {
    setOptions(newOptions);
    buttonClicked = buttonRef;
    // GET BOUNDS OF ORIGINALLY CLICKED BUTTON
    const modalPosition: ModalPosition = {
      top: buttonRect.top,
      left: buttonRect.left,
      width: buttonRect.width,
      right: buttonRect.right,
    };

    // ADJUST POSITION if it would render off-screen
    if (modalPosition.left < window.innerWidth / 2) {
      // SHOW menu on RIGHT
      modalPosition.left = modalPosition.right;
    } else {
      // SHOW menu on LEFT
      modalPosition.left = modalPosition.left - MENUWIDTH;
    }

    setPosition(modalPosition);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    // RESET Z ON ORIGINAL BUTTON
    if (buttonClicked.current) {
      buttonClicked.current.style.zIndex = "0";
      // buttonClicked.current.style.backgroundColor = "pink";
    }
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
        // BACKGROUND TRANSPARENT GREY at Z10 to visually focus menu
        <div className="fixed inset-0 z-10  w-full h-full" style={{ pointerEvents: "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div
            ref={modalRef}
            className="absolute bg-white rounded-lg shadow-lg p-2"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              pointerEvents: "auto",
              backgroundColor: ``,
              maxWidth: `${MENUWIDTH}px`,
              width: `${MENUWIDTH}px`,
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 leading-tight text-xs hover:opacity-50 active:opacity-85 "
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
export const useModalMenu = (options: MenuOption[]) => {
  const { openMenu, closeMenu } = useMenuModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);

  //  let currentButton: React.MouseEvent<HTMLButtonElement>;
  // console.log("BUTTONREF______", buttonRef);

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
        openMenu(options, buttonPosition, buttonRef);

        // BRING CLICK/MOUSEDOVER BUTTON TO FRONT
        if (buttonRef.current) {
          // buttonRef.current.style.backgroundColor = "lime";
          buttonRef.current.style.zIndex = "51";
        }
      }
    },
    [options, openMenu, buttonPosition, closeMenu]
  );

  return { buttonRef, handleClick, buttonPosition, closeMenu };
};

/* MOUSECLICK
*  USAGE:

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

/** 
 * MOUSE OVER
  dropDownLinks = []
 * 
  <MenuDynamicChildren key={id} type="onMouseOver" menuArray={dropDownLinks}>
            <Table_Cell key={id + i} edit="edit">
              {formatCurrency(recipeData.packingCostPriceTotals[i])}
              </Table_Cell>
              </MenuDynamicChildren>
 */
