import Link from "next/link";
import SvgSprite, { allowedIcon } from "./SvgSprite";

import React, { ReactElement } from "react";

interface SvgSpriteLinkProps {
  size?: number;
  iconName: allowedIcon;
  link: "" | string;
  className?: string;
  children?: ReactElement;
}

// (event: React.MouseEvent<HTMLButtonElement>) => void;

const SvgSpriteLink: React.FC<SvgSpriteLinkProps> = ({
  size = 20,
  iconName,
  link,
  className = "",
  children = "",
}) => {
  return (
    <Link href={link}>
      <SvgSprite
        size={size}
        iconName={iconName}
        className={`${className} p-1 hover:opacity-60  hover:rotate-180 transition-all`}
      />
      {children}
    </Link>
  );
};

export default SvgSpriteLink;
