import React, { ComponentProps, ReactNode } from "react";
import SvgSprite, { allowedIcon } from "./SvgSprite";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// 1. Variant-based styling with cva (class-variance-authority)
const pillVariants = cva(
  " text-primary-content relative flex h-full min-w-1 cursor-pointer select-none items-center gap-x-1 rounded-full border border-base-content px-3 py-1 text-nowrap transition-colors hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      tone: {
        clear: "bg-none text-base-content",
        white: "bg-base-100 text-base-content",
        dark: "bg-base-content text-base-100 hover:bg-base-300 hover:text-base-content",
        // clear: "text-black",
        // white: "bg-white text-black",
        // dark: "bg-black text-white",
      },
      // edit: {
      //   edit: "[&>div]:before:text-red-500 ",
      //   save: "[&>div]:before:text-green-600 ",
      //   options: "[&>div]:before:text-blue-500",
      // },
    },
    defaultVariants: {
      tone: "white",
      // edit: "edit", // Set default for edit state
    },
  }
);

// 2. Clear and self-documenting prop types
export interface PillProps
  // ComponentProps includes standard HTML div props e.g onClick
  extends ComponentProps<"div">,
    VariantProps<typeof pillVariants> {
  iconName?: allowedIcon;
  iconPosition?: "left" | "right";
  edit?: "edit" | "save" | "options" | ""; // Optional edit state
  disabled?: boolean; // Optional disabled state
}

// 3. Main component with clean and readable JSX
const Pill: React.FC<PillProps> = ({ className, children, tone, edit = "", iconName, iconPosition = "left", disabled = false, ...props }) => {
  // 4. Simplified icon rendering logic
  const renderMainIcon = () => {
    if (!iconName) return null;
    const iconFill = tone === "dark" ? " fill-base-100" : "fill-base-content";
    return <SvgSprite className={iconFill} size={16} iconName={iconName} />;
  };

  const renderEditIcon = () => {
    if (!edit) return null;
    let editIcon: allowedIcon = "edit"; // Default icon
    if (edit === "save") editIcon = "save";
    if (edit === "options") editIcon = "arrow_drop_down";

    // const iconMap: Record<typeof edit, allowedIcon> = {
    //   edit: "edit",
    //   save: "save",
    //   options: "arrow_drop_down",
    // };

    if (disabled) {
      return;
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center rounded-full before:absolute before:bottom-[-1px] before:left-[50%] before:translate-x-[-50%] before:content-['...'] group ">
        <SvgSprite
          className="m-3 p-1 rounded-full bg-secondary-400 shadow-shadow1 duration-200 opacity-0 transition-opacity group-hover:opacity-100 fill-primary-content"
          size={20}
          iconName={editIcon}
        />
      </div>
    );
  };

  return (
    <div className={twMerge(pillVariants({ tone }), className || "")} {...props}>
      {iconPosition === "left" && renderMainIcon()}
      {children}
      {iconPosition === "right" && renderMainIcon()}
      {renderEditIcon()}
    </div>
  );
};

export default Pill;
