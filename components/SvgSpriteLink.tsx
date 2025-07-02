import Link from "next/link";
import SvgSprite, { allowedIcon } from "./SvgSprite";

import React, { ComponentProps, ReactElement } from "react";

// TODO: EXAMPLE: TAILWIND MERGE
// import { tailwindMerge } from "@/utils/tailwindMerge";
// className={tailwindMerge("mb-2 p-3 overflow-hidden w-full rounded-3xl border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch", className)}

interface SvgSpriteLinkProps extends ComponentProps<"div"> {
  size?: number;
  iconName: allowedIcon;
  link?: URL; // Added URL type
  className?: string;
  children?: ReactElement;
  onClick?: React.MouseEventHandler<HTMLDivElement>; // Added onClick prop
}

const SvgSpriteLink: React.FC<SvgSpriteLinkProps> = ({ size = 16, iconName, link = "", className = "", children = "", onClick, ...props }) => {
  return (
    <Link href={link}>
      <div onClick={onClick} {...props}>
        <SvgSprite size={size} iconName={iconName} className={`${className} p-1 hover:animate-bounce`} />
        {children}
      </div>
    </Link>
  );
};

export default SvgSpriteLink;
