import { language } from "@/app/data/lang";
import { CostsLiveProps, UIElement, data } from "@/app/data/recipe";
import { type ClassValue, clsx } from "clsx";
import { ReactNode } from "react";
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

// FUNCTIONS
export const formatCurrency = (cost: number): number | string => {
  if (!cost) return "";
  return data.setting.currency + " " + cost.toFixed(2);
};

// FORMAT metric or Imperial > 1000 becomes 3 decils
// TODO: imperial
export const formatWeight = (weight: number): number | string => {
  if (!weight) return "";
  // RETURN e.g grams or kilograms
  const unit = weight < 1000 ? data.setting.unitMaster[0] : data.setting.unitMaster[1];
  const weightUnit = weight < 1000 ? weight + " " + unit : (weight / 1000).toFixed(3) + " " + unit;
  //  TODO: need to handle mls and oz/lbs
  return weightUnit;
};

// LIVE TOTAL COSTS: START
// This stores sub total, total and other values for the plating table
export function getLiveTotal(portionSize: number, rowName: string): number {
  const [path] = data.uiElements.filter((obj) => obj.name === rowName);
  const portionValue = Number(path.costsLive[portionSize]);
  return portionValue;
}

// SET THE DATA LAYER Total or SUB TOTAL
export function setLiveTotal(obj: CostsLiveProps, costsLiveName: string) {
  // ARRAY OBJECT to store totals, if any data.uiElements
  const rowNum = data.uiElements.findIndex((obj) => obj.name === costsLiveName);
  if (rowNum < 0) throw new Error(`No Matching LiveCosts Data: ${costsLiveName}. Check uiELements[] names.`);
  data.uiElements[rowNum].costsLive = obj;
}

// CALCULATE THE PROFIT on method selected
export const calcProfit = (costPrice: number, type: string, x: number): number => {
  let m: number = 0;
  if (type === "markup") m = calcMarkup(costPrice, x);
  if (type === "margin") m = calcMarkup(costPrice, x);
  if (type === "xcost") m = calcXCost(costPrice, x);
  return m - costPrice;
};

// REPLACE UNDERSCORES with space
export function replace_(text: string): string {
  return text.split("_").join(" ");
}

// TRANSLATE TO FRENCH OR SPANISH (F EXISTS)
export function getTextTranslation(word: string): string {
  // DOES LANGUAGE EXIST
  if (!data.setting.language) throw new Error(`no language defined in settings`);

  if (!language[word.toLowerCase()]) return replace_(word);

  const translatedWord = language[word.toLowerCase()][data.setting.language];
  if (!translatedWord) return replace_(word);

  return replace_(translatedWord);
}
