"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonSignin from "./ButtonSignin";
import ButtonSignout from "./ButtonSignout";

const data = {
  website_name: "Recipee",
  links: [
    {
      link: "#pricing",
      title: "Pricing",
    },
    {
      link: "/blog",
      title: "Blog",
    },
  ],
  logo: {
    // url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_2bc425d794.png",
    url: "/recipee_logo_white_clearbg.svg",
  },
};

const Header = () => {
  return (
    <div className="flex justify-center items-center w-full fixed top-0 z-50 bg-black">
      <div className="max-w-[1440px] w-full flex justify-between items-center gap-4 px-4 sm:px-12 py-6">
        <Link href="/" className="flex items-center">
          {data?.logo && (
            <Image
              src={data?.logo?.url}
              width={70}
              height={70}
              alt="logo"
              className=" m-3"
            />
          )}
          <p className="text-white text-2xl font-bold font-inter">
            {data?.website_name}
          </p>
        </Link>
        <div className="hidden md:block">
          <div
            className={`flex md:items-center flex-col md:flex-row gap-y-8 gap-x-12`}
          >
            {data?.links?.map((item: any, index: number) => (
              <Link
                key={index}
                href={item?.link}
                className={`text-xl text-white text-center font-inter cursor-pointer hover:text-primary`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <ButtonSignout text="Logout" />
        </div>
        <div className="hidden md:block">
          <ButtonSignin text="Login" />
        </div>
        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66663 7.1665H25.3333"
                  stroke="#006FEE"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.66663 16.5H25.3333"
                  stroke="#006FEE"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.66663 25.8333H25.3333"
                  stroke="#006FEE"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </SheetTrigger>
            <SheetContent className="bg-black px-0 pt-4 border-l-0 min-w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-white text-xl font-bold border-b border-[#b3b3b3] text-left pb-4 pl-4">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-12 mx-auto w-fit block">
                <ButtonSignin text="Login" />
              </div>
              <div className="my-16 mx-auto w-fit">
                <div
                  className={`flex md:items-center flex-col md:flex-row gap-y-8 gap-x-12`}
                >
                  {data?.links?.map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={item?.link}
                      className={`text-xl text-white text-center font-inter cursor-pointer hover:text-primary`}
                    >
                      {item?.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 mb-16 mx-auto w-fit"
              >
                {data?.logo && (
                  <Image
                    src={data?.logo?.url}
                    width={50}
                    height={50}
                    alt="logo"
                  />
                )}
                <p className="text-white text-[15px] sm:text-2xl font-bold font-inter">
                  {data?.website_name}
                </p>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
