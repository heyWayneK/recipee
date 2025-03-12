"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonSignin from "./ButtonSignin";
import ToggleThemeLightDark from "./ToggleThemeLightDark";

const data = {
  website_name: "Recipee.app",
  links: [
    // {
    //   link: "#pricing",
    //   title: "Pricing",
    // },
    // {
    //   link: "/blog",
    //   title: "Blog",
    // },
    {
      link: "/terms",
      title: "Terms of services",
    },
    {
      link: "/privacy-policy",
      title: "Privacy policy",
    },
  ],
  description: "Intelligent Recipee and Production App",
  copyright: `Copyright ©${new Date().getFullYear()}- All rights reserved`,
  logo: {
    url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_2bc425d794.png",
  },
};

// FUTURE:  className={tailwindMerge("p-1", className)}

const Footer = () => {
  return (
    <footer className="h-40">
      <div className="flex justify-center items-center pt-10 w-full bg-base-100 text-base-content">
        <div className=" flex justify-between items-center flex-col max-w-[1440px] w-full md:flex-row gap-2 md:gap-4 px-4 sm:px-12 py-6 border-t border-[#1F1F1F]">
          <div className="  flex gap-2 items-baseline order-last md:order-first text-xs text-base-content">
            <Link href="/" className=" items-center mb-4">
              {/* {data?.logo && <Image src={data?.logo?.url} width={40} height={40} alt="logo" />} */}
              <p className=" font-bold">{data?.website_name}</p>
            </Link>
            <p>|</p>
            <p>{data?.description}</p>
            <p>|</p>
            <p>{data?.copyright}</p>
          </div>
          <div className="">
            <div className={`flex md:items-center flex-row md:flex-row gap-8`}>
              {data?.links?.map((item: any, index: number) => (
                <Link key={index} href={item?.link} className={`text-[15px] text-base-content text-center font-inter cursor-pointer hover:text-primary`}>
                  {item?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="order-first md:order-last"> Sign In{/* <ButtonSignin text="Login" /> */}</div>
          <ToggleThemeLightDark />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
