// MenuModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  RefObject,
  useRef,
  useEffect,
} from "react";

interface MenuModalContextType {
  openMenu: (
    buttonRef: RefObject<HTMLElement>,
    items: string[],
    handleSelect: (item: string) => void
  ) => void;
  closeMenu: () => void;
}

const MenuModalContext = createContext<MenuModalContextType | undefined>(undefined);

interface MenuModalProviderProps {
  children: ReactNode;
}

export const MenuModalProvider: React.FC<MenuModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [buttonRef, setButtonRef] = useState<RefObject<HTMLElement> | null>(null);
  const [handleSelect, setHandleSelect] = useState<(item: string) => void>(() => {});

  const openMenu = useCallback(
    (ref: RefObject<HTMLElement>, items: string[], onSelect: (item: string) => void) => {
      setButtonRef(ref);
      setMenuItems(items);
      setHandleSelect(() => onSelect);
      setIsOpen(true);
    },
    []
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <MenuModalContext.Provider value={{ openMenu, closeMenu }}>
      {children}
      {isOpen && buttonRef && (
        <ModalMenu
          items={menuItems}
          buttonRef={buttonRef}
          onSelect={handleSelect}
          onClose={closeMenu}
        />
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

// ModalMenu component
interface ModalMenuProps {
  items: string[];
  buttonRef: RefObject<HTMLElement>;
  onSelect: (item: string) => void;
  onClose: () => void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ items, buttonRef, onSelect, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isRightAligned = rect.left > window.innerWidth / 3;
      console.log(isRightAligned, rect.left, window.innerWidth);

      setPosition({
        top: rect.bottom + window.scrollY,
        left: isRightAligned ? rect.right - 200 : rect.left, // Assuming menu width is 200px
      });
    }
  }, [buttonRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2 w-48"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          className="px-4 py-2 hover:bg-red-500 cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// Hook to use the modal menu
export const useModalMenu = () => {
  const { openMenu, closeMenu } = useMenuModal();

  const showMenu = (
    event: React.MouseEvent,
    buttonRef: RefObject<HTMLElement>,
    items: string[],
    handleSomething: (item: string) => void
  ) => {
    event.preventDefault();
    openMenu(buttonRef, items, handleSomething);
  };

  return { showMenu, closeMenu };
};
