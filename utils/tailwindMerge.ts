import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const tailwindMerge = (...classes: string[]) => {
  return twMerge(clsx(classes));
};
