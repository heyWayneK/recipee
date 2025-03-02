"use client";

// WHAT: THIS IS FOR THE SMALL OPTION MENU THAT POPS UP.

import { MenuOptionsProps } from "@/components/MenuPopupOnMouseOver";
import SvgSprite from "@/components/SvgSprite";
import React, { createContext, useState, useContext, useCallback, useRef, useEffect, MutableRefObject } from "react";

// STRUCTURE_______________________________________________::
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
  // openMenu: (options: MenuOption[], buttonRect: DOMRect, buttonRef: MutableRefObject<any>) => void;
  openMenu: (options: MenuOptionsProps[], buttonRect: DOMRect, buttonRef: MutableRefObject<any>) => void;
  closeMenu: () => void;
}

// CONTEXT_________________________________________________::
const MenuModalContext = createContext<MenuModalContextType | undefined>(undefined);

// PROVIDER________________________________________________::
export const MenuModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // MODAL MENU WIDTH
  const MENUWIDTH = 220; // px;

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<MenuOptionsProps[]>();
  const [position, setPosition] = useState<ModalPosition>({ top: 0, left: 0, width: 0, right: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  let buttonClicked: MutableRefObject<HTMLDivElement>;

  // const openMenu = useCallback((newOptions: MenuOption[], buttonRect: DOMRect, buttonRef: MutableRefObject<HTMLDivElement>) => {
  const openMenu = useCallback((newOptions: MenuOptionsProps[], buttonRect: DOMRect, buttonRef: MutableRefObject<HTMLDivElement>) => {
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

  const closeMenu = useCallback((changed = false) => {
    // RESET Z ON ORIGINAL BUTTON
    if (buttonClicked?.current) {
      buttonClicked.current.style.zIndex = "0";
      // console.log("SHOULD SHOW A CHANGE ARROW**************", buttonClicked?.current.textContent);
      // ADD ROTATING OUTLINE ON UPDATE
      // Add the class that includes the ::after pseudo-element
      // if (changed) buttonClicked.current.classList.add("rotating-outline");
      // buttonClicked.current.style.backgroundColor = "pink";
    }
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
        // MODAL BACKGROUND TRANSPARENT LAYER Z-10
        <div className="fixed inset-0 z-10  w-full h-full" style={{ pointerEvents: "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div
            ref={modalRef}
            className="absolute flex flex-col gap-1 bg-white rounded-lg shadow-lg p-2 "
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              pointerEvents: "auto",
              backgroundColor: ``,
              maxWidth: `${MENUWIDTH}px`,
              width: `${MENUWIDTH}px`,
            }}
          >
            {options &&
              options.map((option, index) => (
                // HANDLER = ()
                // SELECTED ID for drop down current selected
                // ID = the ID is drop down list item id
                // JSX = the JSX list item name
                <button
                  key={index}
                  className={`block w-full text-left px-2 py-1 rounded-s leading-tight text-xs my-2 border cursor-none ${
                    option?.handler !== null && option?.id === option?.selectedId
                      ? " bg-gradientGreyDarkerBott"
                      : ` ${option?.handler !== null ? " hover:opacity-50 hover:border active:opacity-85" : " cursor-none"}`
                  }  `}
                  disabled={option?.handler === null ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    // SLOW DOWN UPDATE to show spinner
                    setTimeout(() => {
                      {
                        option.handler && option.handler();
                      }
                    }, 500);
                    closeMenu();
                  }}
                >
                  <div className="flex gap-1 inset-0">
                    {option.handler === null ? (
                      `${" "}`
                    ) : option?.selectedId === option?.id ? (
                      <div className=" flex place-items-center  flex-grow-0 flex-shrink-0 inset-0">
                        <SvgSprite size={20} iconName="check_circle" />
                      </div>
                    ) : (
                      <div className="flex place-items-center justify-content-center ">
                        <SvgSprite size={20} iconName="radio_button_unchecked" />
                      </div>
                    )}
                    <div className="flex-grow">{option.jsx}</div>
                  </div>
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

// HOOK____________________________________________________::
// export const useModalMenu = (options: MenuOption[]) => {
export const useModalMenu = (options: MenuOptionsProps[]) => {
  const { openMenu, closeMenu } = useMenuModal();
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

// USAGE:__________________________________________________::
// There are 2 variants on MOUSECLICK and MOUSEOVER (dont use mouse over - Tablets/Mobile )
/* MOUSECLICK

import { MenuButton } from "@/components/MenuButton";
import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
}

const MenuOption1: React.FC<Props> = ({ children }) => {
  const menuOptions = [~
    { name: "Option 1 - 2", handler: () => console.log("Option 1 clicked ") },
    { name: "Option 2 - 2", handler: () => console.log("Option 2 clicked ") },
    { name: "Option 3 - 2", handler: () => console.log("Option 3 clicked ") },
  ];

  return <MenuButton options={menuOptions}>{children}</MenuButton>;
};

export default MenuOption1;

*/

/**  DONT USE MOUSEOVER VERSION - IT DOESNT WORK ON MOBILE OR TABLETS
 * MOUSE OVER
  dropDownLinks = []
 * 
  <MenuDynamicChildren key={id} type="onMouseOver" menuArray={dropDownLinks}>
            <Table_Cell key={id + i} edit="edit">
              {formatCurrency(recipeData.packingCostPriceTotals[i])}
              </Table_Cell>
              </MenuDynamicChildren>
 */
