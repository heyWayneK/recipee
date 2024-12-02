import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// To work out if the text over a color must be white or black
export function isHexColorLightOrDark(color: string): "light" | "dark" {
  // Remove the hash if it exists
  color = color.replace(/^#/, "");

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate the brightness
  const brightness = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
  );

  // Return 'light' or 'dark'
  return brightness > 127.5 ? "light" : "dark";
}

// USAGE:
const backgroundColor: string = "#EE7AB7";
const brightness: "light" | "dark" = isHexColorLightOrDark(backgroundColor);

const textColor: string = brightness === "light" ? "#000000" : "#FFFFFF";

// // MARGIN AND MARKUP
// For a product that costs $100 to produce:

export const markup = (price: number, markup: number): number => {
  // Markup of 200%:
  // Selling Price = COGS + (COGS x Markup%)
  // Selling Price = $100 + ($100 x 200%)
  // Selling Price = $100 + $200 = $300
  return price + price * markup;
};

export const margin = (price: number, markup: number): number => {
  // Margin of 60%:
  // 0.60 = (Revenue - $100) / Revenue
  // Revenue = $100 / (1 - 0.60)
  // Revenue = $250
  return price / (1 - markup);
};

export const convertKcalToKj = (kcal: number): number => {
  return kcal * 4.184;
};

export const convertKjToKcal = (kj: number): number => {
  return kj / 4.184;
};
