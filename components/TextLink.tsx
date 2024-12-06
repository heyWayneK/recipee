import Link from "next/link";
import React, { ReactNode } from "react";

interface TextLinkProps {
  className?: string;
  children: ReactNode;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClick: () => void;
}

const TextLink: React.FC<TextLinkProps> = ({ className = "", children, onClick }) => {
  return (
    // <div className="">
    <div onClick={onClick} className={`${className} w-full text-nowrap py-2 px-3 hover:font-bold`}>
      {children}
    </div>
    // </div>
  );
};

export default TextLink;
