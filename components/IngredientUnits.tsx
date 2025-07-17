import { useRecipeData } from "@/contexts/useRecipeData";
import { el } from "date-fns/locale";
import React from "react";

type IngredientUnitsProps = {
  children: React.ReactNode;
  className?: string;
};

const IngredientUnits: React.FC<IngredientUnitsProps> = ({ children, className = "" }): React.ReactNode | "" => {
  const { systemData, recipeMode } = useRecipeData();

  //   const formatWeight = (weight: number | string): string => {
  // INFO: Weight is always stored in metric grams or metric milliliters
  let isImperial: boolean = false;
  let isFluid: boolean = false;
  let isHome: boolean = recipeMode === "home" ? true : false;
  let weightUnit: string = "";
  let weightUnitsForHome: string = "";

  // Check if children is valid. Needs to be a number  or string number
  if (!children) return console.error("Invalid weight value", children), "";

  let weight: number | string = children ? Number(children) : "";

  // Convert weight to a number if it's a string
  if (typeof weight === "string") weight = Number(weight);

  // Check if weight is a valid number
  if (isNaN(weight)) return console.error("Invalid weight value", weight), "";

  // Check Object or return ""
  if (!systemData || !systemData.org) return console.error("System data is not available"), "";

  // Check if unit_metric_imperial_id exists (1 = metric, 2 = imperial)
  if (!systemData.org.unit_metric_imperial_id) return console.error("unit_metric_imperial_id is not available"), "";

  // Find the default unit type from systemData
  let defaultUnitType = systemData.unit_metric_imperial.find((val) => val.is_default === true)?.name || "";
  if (!defaultUnitType || defaultUnitType === "") {
    defaultUnitType = "metric";
    return console.warn("Default unit type is not available"), "";
  }

  // Check if the system is imperial or metric
  isImperial = systemData.org.unit_metric_imperial_id === 2 || false;

  // TODO: handle fluid ounces and pounds
  isFluid = false;

  if (defaultUnitType === "imperial" || isImperial) {
    // Home or Pro Mode
    // Home = Presents grams with additional brackets for (cups, tablespoons, teaspoon)
    // Home fluid present additional (cups, pints, quarts, gallons)
    if (isHome) {
      // Handle imperial units
      if (isFluid) {
        // Handle fluid ounces
        if (weight < 28.4131) {
          weightUnitsForHome = weight + " fl oz"; // fluid ounces
        } else if (weight < 473.176) {
          weightUnitsForHome = (weight / 28.4131).toFixed(2) + " cups"; // cups
        } else if (weight < 3785.41) {
          weightUnitsForHome = (weight / 473.176).toFixed(2) + " pints"; // pints
        } else if (weight < 15141.6) {
          weightUnitsForHome = (weight / 1892.71).toFixed(2) + " quarts"; // quarts
        } else {
          weightUnitsForHome = (weight / 3785.41).toFixed(2) + " gal"; // gallons
        }
      } else if (!isFluid) {
        // Is not fluid, handle weight
        // for teaspoons, tablespoons, cups, pints, quarts, gallons
        if (weight < 28.3495) {
          weightUnitsForHome = weight + " oz"; // ounces
        } else if (weight < 453.592) {
          weightUnitsForHome = (weight / 28.3495).toFixed(2) + " lb"; // pounds
        } else if (weight < 2240) {
          weightUnitsForHome = (weight / 453.592).toFixed(2) + " lb"; // pounds
        } else {
          weightUnitsForHome = (weight / 2240).toFixed(2) + " tons"; // tons
        }
      }
    } else {
      if (isFluid) {
        // Handle fluid ounces
        if (weight < 29.5735) {
          weightUnit = weight + " oz"; // " fl oz"; // fluid ounces
        } else if (weight < 3785.41) {
          weightUnit = (weight / 29.5735).toFixed(2) + " cups"; // cups
        } else {
          weightUnit = (weight / 3785.41).toFixed(2) + " gal"; // gallons
        }
      } else {
        // Is not fluid, handle weight
        // Handle imperial units
        if (weight < 16) {
          weightUnit = weight + " oz"; // ounces
        } else if (weight < 2240) {
          weightUnit = (weight / 16).toFixed(2) + " lb"; // pounds
        } else {
          weightUnit = (weight / 2240).toFixed(2) + " tons"; // tons
        }
      }
    }
  } else {
    // Handle metric units
    if (isFluid) {
      // Handle milliliters
      if (weight < 1000) {
        weightUnit = weight + " mL"; // milliliters
      } else if (weight < 1000000) {
        weightUnit = (weight / 1000).toFixed(2) + " L"; // liters
      } else {
        weightUnit = (weight / 1000000).toFixed(2) + " kl"; // kiloliters
      }
    } else {
      // Is Not Fluid. Handle weight in metric units
      if (weight < 1000) {
        weightUnit = weight + " g"; // grams
      } else if (weight < 1000000) {
        weightUnit = (weight / 1000).toFixed(2) + " kg"; // kilograms
      } else {
        weightUnit = (weight / 1000000).toFixed(2) + " ton"; //" tonnes"; // tonnes
      }
    }
  }

  // Format Weight or Volume grams, kilograms, milliliters, ounces, pounds, units_ea

  // Set Decimal Places
  const weightDecimals = Number(weight.toFixed(3));

  // RETURN e.g grams or kilograms
  // const unit = weightDecimals < 1000 ? data.setting.unitMaster[0] : data.setting.unitMaster[1];
  // TODO: create component with the function to convert the weight to grams
  //  using useRecipeData() Hook

  // const unit = weightDecimals < 1000 ? "g" : "kg";
  // weightUnit = weightDecimals < 1000 ? weightDecimals + " " + unit : weightDecimals / 1000 + "\u00A0" + unit;
  //  TODO: need to handle mls and oz/lbs
  //  TODO: need to handle mls and oz/lbs

  return <span className={className}>{`${children} ${weightUnit}${weightUnitsForHome}`}</span>;
};

export default IngredientUnits;
