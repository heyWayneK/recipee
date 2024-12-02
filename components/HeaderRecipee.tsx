import Link from "next/link";
import Image from "next/image";
import React from "react";
import ButtonSignin from "./ButtonSignin";
import Button from "./Button";
import SvgSprite from "./SvgSprite";
import SvgSpriteLink from "./SvgSpriteLink";
// import { Logo as React } from "/logo/recipe_logo_black.svg";

const data = {
  website_name: "Recipee",
  links: [
    {
      link: "/home",
      title: "Home",
    },
    {
      link: "/recipes",
      title: "Recipes",
    },
    {
      link: "/sub-recipes",
      title: "Sub-recipees",
    },
    {
      link: "/stock",
      title: "Stock",
    },
    {
      link: "/suppliers",
      title: "Suppliers",
    },
  ],
  logo: {
    // url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_2bc425d794.png",
    url: "/recipee_logo_white_clearbg.svg",
  },
};

function HeaderRecipee() {
  return (
    <div className="w-full flex justify-between align-middle">
      <Image
        src={"/logo/recipe_logo_black.svg"}
        alt="Recipee Logo Black"
        width={200}
        height={100}
      />

      <div className="flex gap-3 items-center content-center">
        <SvgSpriteLink
          iconName="hamburger"
          size={40}
          link="/"
          className="rounded-md border-2"
        />
        {data.links.map((item: any, index: number) => (
          <Link
            key={item.title}
            href={item.title}
            className="whitespace-nowrap"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeaderRecipee;
