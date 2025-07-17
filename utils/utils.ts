import { data } from "@/app/api/recipe";
import { language } from "@/app/data/lang";

import { type ClassValue, clsx } from "clsx";
import Decimal from "decimal.js";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Merge various Tailwind Classes to avoid clashes.
 * Last classes override former ones
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creact and async await delay using a promise
 * used for testing, to create a delay to see loading bar and timeouts.
 * @param delay default 2000ms
 * @returns void
 * @example await createPromiseDelay();
 */
export const createPromiseDelay = async (delay: number = 2000) =>
  await new Promise((res) => {
    console.log("REMOVE IN LIVE  - FOR TESTING ONLY - DELAYING FOR", delay);
    setTimeout(res, delay);
  });

// To work out if the text over a color must be white or black
export function isHexColorLightOrDark(color: string): "light" | "dark" {
  // Remove the hash if it exists
  color = color.replace(/^#/, "");

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate the brightness
  const brightness = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Return 'light' or 'dark'
  return brightness > 127.5 ? "light" : "dark";
}

// USAGE:
const backgroundColor: string = "#EE7AB7";
const brightness: "light" | "dark" = isHexColorLightOrDark(backgroundColor);

const textColor: string = brightness === "light" ? "#000000" : "#FFFFFF";

// // MARGIN AND MARKUP
// For a product that costs $100 to produce:

export const calcMarkup = (price: number, markup: number): number => {
  // Markup of 200%:
  // Selling Price = COGS + (COGS x Markup%)
  // Selling Price = $100 + ($100 x 200%)
  // Selling Price = $100 + $200 = $300
  return price + price * markup;
};

export const calcMargin = (price: number, margin: number): number => {
  // Margin of 60%:
  // 0.60 = (Revenue - $100) / Revenue
  // Revenue = $100 / (1 - 0.60)
  // Revenue = $250
  return price / (1 - margin);
};

export const calcXCost = (price: number, x: number): number => {
  return price * x;
};

export const convertKcalToKj = (kcal: number): number => {
  return kcal * 4.184;
};

export const convertKjToKcal = (kj: number): number => {
  return kj / 4.184;
};

export const saltToSodium = (salt: number): number => {
  //Sodium vs. Salt: Percentages refer to salt (sodium chloride), but sodium content can be calculated as ~39.3% of salt by weight (e.g., 1g salt = 393 mg sodium).

  return salt * 0.3934;
};

// TODO: create component with the function to get Currency Symbol
//  using useRecipeData() Hook
// FUNCTIONS_______________________________________________::
export const formatCurrency = (cost: number): number | string => {
  if (!cost) return "";
  return "ZAR" + "\u00A0" + cost.toFixed(2);
};

// CALCULATE THE PROFIT on method selected
export const calcProfit = (costPrice: number, type: string, x: number): number => {
  let m: number = 0;
  if (type === "markup") {
    m = calcMarkup(costPrice, x);
  } else if (type === "margin") {
    m = calcMarkup(costPrice, x);
  } else if (type === "x_cost") {
    m = calcXCost(costPrice, x);
  } else {
    throw new Error(`Unknown calcProfit type: ${type}`);
  }

  return m - costPrice;
};

// REPLACE UNDERSCORES with space
export function replace_(text: string): string {
  return text.split("_").join(" ");
}

// TRANSLATE TO FRENCH OR SPANISH (F EXISTS)
export function getTextTranslation(word: string): string {
  // DOES LANGUAGE EXIST - EN FR SP...
  // TODO: get language in component to translate
  // if (!data.setting.language) throw new Error(`no language defined in settings`);
  word = word.toLowerCase();
  if (!language[word]) return replace_(word);

  // const translatedWord = language[word.toLowerCase()][data.setting.language];
  const translatedWord = language[word.toLowerCase()]["EN"];
  if (!translatedWord) return replace_(word);

  return replace_(translatedWord);
}

export function splitTextOnCapitals(variableName: string): string {
  // Use a regular expression to match one or more lowercase letters followed by an uppercase letter
  const words = variableName.match(/([a-z]+|[A-Z][a-z]*)/g) || [];

  return words.join(" ");
}

export function cleanComponentKeyName(keyName: any): string {
  // Remove special characters and replace spaces with underscores
  return keyName
    .toString()
    .replace(/[^a-zA-Z0-9_]/g, "")
    .replace(/\s+/g, "_");
}

// // RECURSIVELY IX DECIMAL DATATYPES IN AN OBJECT
// export const convertDecimalsToNumbers = (obj: any) => {
//   for (const key in obj) {
//     if (Array.isArray(obj[key])) {
//       obj[key].forEach((item: any) => convertDecimalsToNumbers(item));
//     } else if (typeof obj[key] === "object" && obj[key] !== null) {
//       convertDecimalsToNumbers(obj[key]);
//     } else if (obj[key] instanceof Decimal) {
//       obj[key] = parseFloat(obj[key].toNumber());
//     }
//   }
// };

// TODO: convertions

/**

Weight:
1 ounce (oz) ≈ 28.35 grams (g)
1 pound (lb) ≈ 453.59 grams (g) or 0.45 kilograms (kg)

Volume:
1 teaspoon (tsp) ≈ 5 milliliters (mL)
1 tablespoon (tbsp) ≈ 15 milliliters (mL)
1 fluid ounce (fl oz) ≈ 29.57 milliliters (mL)
1 cup (c) ≈ 240 milliliters (mL)
1 pint (pt) ≈ 473 milliliters (mL)
1 quart (qt) ≈ 946 milliliters (mL)
1 gallon (gal) ≈ 3.785 liters (L)

Temperature:
°C = (°F - 32) × 5/9
°F = (°C × 9/5) + 32
 */

// TODO: metric vs Imperial
/**
 Metric Units
The metric system is based on units of 10 and is widely used globally. Common units include:

Weight (Mass):
Gram (g): Used for small quantities (e.g., spices, flour).
Kilogram (kg): Used for larger quantities (e.g., meat, vegetables).

Volume:
Milliliter (mL): Used for small liquid quantities (e.g., vanilla extract, water).
Liter (L): Used for larger liquid quantities (e.g., milk, broth).

Length:
Millimeter (mm): Rarely used in food but can describe thickness.
Centimeter (cm): Used for sizing (e.g., cake diameter).

Temperature:
Celsius (°C): Used for cooking and baking temperatures.

Imperial Units

Weight (Mass):
Ounce (oz): 
Pound (lb): 

Volume:
Teaspoon (tsp): Used for small liquid or dry quantities (e.g., salt, vanilla extract).

Tablespoon (tbsp): Used for slightly larger quantities (e.g., oil, sugar).

Fluid Ounce (fl oz): Used for liquid measurements (e.g., milk, juice).

Cup (c): Used for both dry and liquid ingredients (e.g., flour, water).
Pint (pt): Used for larger liquid quantities (e.g., cream, beer).
Quart (qt): Used for even larger quantities (e.g., soup, stock).
Gallon (gal): Used for very large quantities (e.g., milk, water).

Length:
Inch (in): Used for sizing (e.g., pie diameter).

Temperature:
Fahrenheit (°F): Used for cooking and baking temperatures.

 */
