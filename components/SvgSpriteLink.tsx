import Link from "next/link";
import SvgSprite, { allowedIcon } from "./SvgSprite";

import React from "react";

interface SvgSpriteLinkProps {
  size?: number;
  iconName: allowedIcon;
  link: "" | string;
  className?: string;
}

// (event: React.MouseEvent<HTMLButtonElement>) => void;

const SvgSpriteLink: React.FC<SvgSpriteLinkProps> = ({
  size = 20,
  iconName,
  link,
  className = "",
}) => {
  return (
    <Link href={link}>
      <SvgSprite
        size={size}
        iconName={iconName}
        className={`${className} p-1 hover:opacity-60  hover:rotate-180 transition-all`}
      />
    </Link>
  );
};

export default SvgSpriteLink;
