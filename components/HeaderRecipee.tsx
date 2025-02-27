"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { tailwindMerge } from "@/utils/tailwindMerge";
import OnlineOffline from "./OnlineOffline";

const data = {
  website_name: "Recipee",
  menuItems: [
    { title: "Home", link: "/recipee", children: [] },
    {
      title: "Recipes",
      link: "/recipee/recipes",
      children: [
        { title: "customer form", link: "/recipee/formgen/customer" },
        { title: "ingredients form", link: "/recipee/formgen/ingredients" },
        { title: "supplier form", link: "/recipee/formgen/supplier" },
        { title: "Categories", link: "/recipee/stock" },
        { title: "Recipe Categories", link: "/recipee/categories" },
        { title: "Recipe Book", link: "/recipee/prep" },
        { title: "Versions", link: "/recipee/prep" },
      ],
    },
    {
      title: "Ingredients",
      link: "/recipee/formgen/ingredients/",
      children: [
        { title: "Allergies", link: "/recipee/allergies/" },
        { title: "Prep Instructions", link: "/recipee/prep" },
        { title: "Ingredient Categories", link: "/recipee/stock" },
      ],
    },
    {
      title: "Suppliers",
      link: "/recipee/stock",
      children: [
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
      ],
    },
    {
      title: "Production",
      link: "/recipee/markup",
      children: [
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
      ],
    },
    {
      title: "e-Commerce",
      link: "/recipee/markup",
      children: [
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
      ],
    },
    {
      title: "Stock",
      link: "/recipee/stock",
      children: [
        { title: "Stock Levels", link: "/recipee/allergies/" },
        { title: "Minimum Levels", link: "/recipee/allergies/" },
        { title: "Locations", link: "/recipee/prep" },
      ],
    },
    {
      title: "Cost Rules",
      link: "/recipee/costs",
      children: [
        { title: "Other Costs", link: "/recipee/allergies/" },
        { title: "Packaging Costs", link: "/recipee/prep" },
        { title: "Markup Rules", link: "/recipee/prep" },
      ],
    },

    {
      title: "To-do",
      link: "/recipee/todo",
      children: [
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
        { title: "Link 1", link: "/recipee/link1/" },
      ],
    },
    {
      title: "Account",
      link: "/recipee/admin",
      children: [
        { title: "Settings", link: "/recipee/allergies/" },
        { title: "Users", link: "/recipee/allergies/" },
        { title: "Roles", link: "/recipee/prep" },
        { title: "Billing", link: "/recipee/prep" },
        { title: "Subscription", link: "/recipee/prep" },
        { title: "Images", link: "/recipee/allergies/" },
      ],
    },
    {
      title: "Super Admin",
      link: "/recipee/admin",
      children: [
        { title: "Customers", link: "/recipee/allergies/" },
        { title: "Users", link: "/recipee/allergies/" },
        { title: "Roles", link: "/recipee/prep" },
      ],
    },
  ],
  logo: { url: "/logo/recipe_logo_black.svg" },
};

const HeaderRecipee: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null); // Add ref for dropdown

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdown and close others
  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Close dropdown when clicking child item
  const handleChildClick = () => {
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (item: any) => {
    if (pathname === item.link) return true;
    if (item.children.some((child: any) => pathname === child.link)) return true;
    return false;
  };

  return (
    <div className="z-[1000]">
      <OnlineOffline />
      {/* <div className="container mx-auto px-4 pb-4 flex flex-wrap justify-between items-center"> */}
      <div className="px-4 pb-4 flex flex-wrap justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center">
          <Image src={data.logo?.url || "/fallback-logo.svg"} alt="Logo" width={150} height={75} className="mr-4" />
        </div>
        {/* MAIN NAVIGATION */}
        <nav className="text-xs hidden md:flex flex-wrap gap-x-2 gap-y-2 pt-4" ref={dropdownRef}>
          {data.menuItems?.map((item) => (
            <div key={item.title} className="relative">
              {item.children.length > 0 ? (
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className={tailwindMerge(
                    `border text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 rounded-md flex items-center transition-colors duration-200 ${
                      isActive(item) ? "font-semibold bg-black text-white border" : ""
                    }`
                  )}
                >
                  {item.title}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={item.link}
                  className={`border text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 rounded-md flex items-center transition-colors duration-200 ${
                    isActive(item) ? "font-semibold bg-primary-500 text-primary-content" : ""
                  }`}
                >
                  {/* WEB VIEW HOME */}
                  {item.title}
                </Link>
              )}
              {/* DROPDOWN MENU */}
              {item.children.length > 0 && activeDropdown === item.title && (
                <div className="absolute z-[1001] text-sm left-0 top-full w-48 bg-white shadow-lg rounded-md">
                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.link}
                      onClick={handleChildClick} // Add click handler to close dropdown
                      className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150 ${pathname === child.link ? "font-semibold bg-gray-50" : ""}`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )) || <p className="text-gray-700">No menu items available</p>}
        </nav>
        <div className="md:hidden">
          {/* HAMBURGER MENU */}
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none p-2" aria-label="Toggle navigation menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md transition-all duration-300 py-4">
          {data.menuItems?.map((item) => (
            <div key={item.title} className="relative">
              {item.children.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-center ${isActive(item) ? "font-semibold bg-gray-50" : ""}`}
                  >
                    {item.title}
                    <svg className="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === item.title && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.link}
                          className={`block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 ${pathname === child.link ? "font-semibold bg-gray-50" : ""}`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.link} className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isActive(item) ? "font-semibold bg-gray-50 text-center" : ""}`}>
                  {item.title}
                </Link>
              )}
            </div>
          )) || <p className="px-4 py-2 text-gray-700">No menu items available</p>}
        </nav>
      )}
    </div>
  );
};

export default HeaderRecipee;
