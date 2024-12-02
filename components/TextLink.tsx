import Link from "next/link";
import React, { ReactNode } from "react";

interface TextLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TextLink: React.FC<TextLinkProps> = ({
  className = "",
  children,
  onClick,
}) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className={`${className} w-full text-nowrap py-0 px-3 hover:font-bold`}
      >
        {children}
      </button>
    </div>
  );
};

export default TextLink;
