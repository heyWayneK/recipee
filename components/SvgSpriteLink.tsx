import Link from "next/link";
import SvgSprite, { allowedIcon } from "./SvgSprite";

import React, { ReactElement } from "react";

// TODO: EXAMPLE: TAILWIND MERGE
// import { tailwindMerge } from "@/utils/tailwindMerge";
// className={tailwindMerge("mb-2 p-3 overflow-hidden w-full rounded-3xl border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch", className)}

interface SvgSpriteLinkProps {
  size?: number;
  iconName: allowedIcon;
  link: "" | string;
  className?: string;
  children?: ReactElement;
}

// (event: React.MouseEvent<HTMLButtonElement>) => void;

const SvgSpriteLink: React.FC<SvgSpriteLinkProps> = ({ size = 20, iconName, link, className = "", children = "" }) => {
  return (
    <Link href={link}>
      <SvgSprite size={size} iconName={iconName} className={`${className} p-1 hover:opacity-60  hover:rotate-180 transition-all`} />
      {children}
    </Link>
  );
};

export default SvgSpriteLink;
