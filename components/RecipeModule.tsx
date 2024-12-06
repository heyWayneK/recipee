import React, { ReactElement, useState } from "react";
import DottedBorder from "./DottedBorder";
import Row_EditOrProduction from "./Row_EditOrProduction";
import Row_Heading from "./Row_Heading";
import Row_ElementsList from "./Row_ElementsList";
import Row_IngredientCost from "./Row_IngredientCost";
import Row_PackagingCost from "./Row_PackagingCost";
import Row_Markup from "./Row_Markup";
import Row_SalePriceExVat from "./Row_SalePriceExVat";
import Row_SalePriceIncVat from "./Row_SalePriceIncVat";
import Row_Print from "./Row_Print";
import Row_OtherCost from "./Row_OtherCost";
import Pill from "./Pill";
import TextEditable from "./TextEditable";
import TextLink from "./TextLink";
import SvgSpriteLink from "./SvgSpriteLink";
import { PointerIcon } from "lucide-react";
import { calcMarkup, calcXCost } from "@/lib/utils";
import path from "path/posix";
import Table_Cell from "./Table_Cell";

export interface DataProps {
  portions: number[];
  setting: {
    unitMaster: string[];
    unitMask: string[];
    vat: number;
    currency: string;
    locale: string;
  };
  costRules: CostRules;
  components: ComponentsProps[];
  uiElements: UIElement[];
  packagingCostsId: { [key: number]: number };
  otherCostsId: { [key: number]: number };
  markupId: { [key: number]: number };
}

interface CostRules {
  packagingCosts: {
    [key: number]: PackagingCost;
  };
  otherCosts: {
    [key: number]: OtherCost;
  };
  markUps: {
    [key: number]: MarkUp;
  };
}

interface PackagingCost {
  name: string;
  cost: number;
}

interface OtherCost {
  name: string;
  costs: OtherCostItem[];
}

interface OtherCostItem {
  name: string;
  cost: number;
  id: number;
}

interface MarkUp {
  name: string;
  factor: number;
  type: "markup" | "margin" | "xcost";
}

interface RecipeType {
  type: ["local", "master", "unlinkedMaster"];
}

interface nutriPer100Props {
  name: string;
  valuePer100: number;
  unit: string;
}

interface ComponentsProps {
  name: string;
  id: number;
  subType: "ingredient" | "recipe";
  recipeId: number | null;
  recipeType: "local" | "master" | "unlinkedMaster";
  ingredientId: number | null;
  portions: { [key: number]: number };
  ingredientCosts: { [key: number]: number };
  yield: number;
  nutriPer100: nutriPer100Props[];
}

interface UIElement {
  name: string;
  reactComponent?: string;
  costsLive: { [key: number]: number };
}

const data: DataProps = {
  setting: {
    // ALL RECIPES ARE IN g
    unitMaster: ["g", "kg"],
    // BUT unitMask will provide coversions to oz/lb
    unitMask: ["g", "kg"],
    vat: 0.15,
    currency: "R",
    locale: "ZAR",
  },
  costRules: {
    // only include Packaging Costs included in the recipe
    packagingCosts: {
      1: { name: "350g Hulamin tray", cost: 1.43 },
      2: { name: "275g Hulamin Tub", cost: 2.43 },
      5: { name: "Smoothie 300ml", cost: 1.2 },
      8: { name: "1kg Hulamin", cost: 7.43 },
      25: { name: "300g Plastic Tray", cost: 7.43 },
      36: { name: "1kg Hulamin", cost: 7.43 },
      549876: { name: "1kg Hulamin", cost: 7.43 },
    },
    // Only include otherCosts used in this recipe
    otherCosts: {
      23: {
        name: "350g meal extra",
        costs: [
          { name: "Film 350g", cost: 1.43, id: 730 },
          { name: "Small Sticker", cost: 0.32, id: 356 },
          { name: "Lid Sticker", cost: 0.32, id: 859 },
          { name: "Share of Box", cost: 0.75, id: 529 },
        ],
      },
      46: {
        name: "350g meal extra",
        costs: [
          { name: "Film 350g", cost: 1.98, id: 730 },
          { name: "Small Sticker", cost: 1.3, id: 356 },
          { name: "Lid Sticker", cost: 0.92, id: 859 },
          { name: "Share of Box", cost: 0.88, id: 529 },
        ],
      },
    },
    markUps: {
      1: { name: "200%", factor: 2.0, type: "markup" },
      2: { name: "175%", factor: 1.75, type: "markup" },
      3: { name: "FitChef", factor: 1.5, type: "markup" },
      4: { name: "Thyme", factor: 1.4, type: "markup" },
      5: { name: "Smoothies", factor: 2.4, type: "markup" },
      6: { name: "Snacks", factor: 2.6, type: "markup" },
      7: { name: "70% Margin", factor: 0.7, type: "margin" },
      8: { name: "2x", factor: 2, type: "xcost" },
      9: { name: "2.5x", factor: 2.5, type: "xcost" },
    },
  },
  portions: [100, 275, 350, 1000],
  packagingCostsId: { 100: 2, 275: 2, 350: 1, 1000: 8 },
  otherCostsId: { 100: 23, 275: 46, 350: 46, 1000: 23 },
  markupId: { 100: 1, 275: 7, 350: 9, 1000: 8 },
  components: [
    {
      name: "Cheese Cheddar",
      id: 101235,
      subType: "ingredient",
      recipeType: "local",
      recipeId: 26668,
      ingredientId: 4567,
      portions: { 100: 11, 275: 12, 350: 13, 1000: 14 },
      ingredientCosts: { 100: 11.11, 275: 12.11, 350: 13.11, 1000: 14.11 },
      yield: 1,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "Roasted Cauliflower",
      id: 101235,
      subType: "recipe",
      recipeType: "local",
      recipeId: 986,
      ingredientId: null,
      portions: { 100: 21, 275: 22, 350: 23, 1000: 24 },
      ingredientCosts: { 100: 21.11, 275: 22.45, 350: 23.47, 1000: 24.37 },
      yield: 0.79,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "Master - FC Potato Mash super long name",
      id: 1012456,
      subType: "recipe",
      recipeId: 6759,
      recipeType: "local",
      ingredientId: null,
      portions: { 100: 31, 275: 32, 350: 33, 1000: 34 },
      ingredientCosts: { 100: 31.66, 275: 32.43, 350: 33.7, 1000: 34.88 },

      yield: 0.82,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "FC Mince Cautage Pie",
      id: 10129876,
      subType: "recipe",
      recipeId: 657,
      recipeType: "local",
      ingredientId: null,
      portions: { 100: 41, 275: 42, 350: 43, 1000: 44 },
      ingredientCosts: { 100: 41.66, 275: 42.43, 350: 43.7, 1000: 44.88 },

      yield: 89,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
    {
      name: "Olive Oil",
      id: 10129876,
      subType: "recipe",
      recipeId: null,
      recipeType: "local",
      ingredientId: 568,
      portions: { 100: 51, 275: 52, 350: 53, 1000: 54 },
      ingredientCosts: { 100: 51.33, 275: 52.43, 350: 53.7, 1000: 54.88 },

      yield: 0.73,
      nutriPer100: [
        { name: "kcal", valuePer100: 2000, unit: "kcal" },
        { name: "kj", valuePer100: 4000, unit: "kcal" },
        { name: "protein", valuePer100: 7, unit: "g" },
        { name: "fat", valuePer100: 1.5, unit: "g" },
        { name: "saturated fat", valuePer100: 0.7, unit: "g" },
        { name: "monounsaturate fat", valuePer100: 0.5, unit: "g" },
        { name: "Polyunsaturate fat", valuePer100: 0.2, unit: "g" },
        { name: "trans fats", valuePer100: 0, unit: "g" },
        { name: "omega-3", valuePer100: 0.1, unit: "g" },
        { name: "omega-6", valuePer100: 0.05, unit: "g" },
        { name: "omega-9", valuePer100: 0.1, unit: "g" },
        { name: "net carbohydrate", valuePer100: 6, unit: "g" },
        { name: "total carbohydrate", valuePer100: 9, unit: "g" },
        { name: "starch", valuePer100: 1.3, unit: "g" },
        { name: "total sugars", valuePer100: 5, unit: "g" },
        { name: "added sugar", valuePer100: 0.2, unit: "g" },
        { name: "artificial sugar", valuePer100: 0, unit: "g" },
        { name: "fibre", valuePer100: 2, unit: "g" },
        { name: "sodium", valuePer100: 0.5, unit: "g (#mg)" },
        { name: "salt", valuePer100: 1, unit: "g (#mg)" },
      ],
    },
  ],
  uiElements: [
    // { name: "Edit Or Production", reactComponent: "<Row_EditOrProduction>" },
    { name: "controls", costsLive: {} },
    { name: "plating", costsLive: {} },
    { name: "components", costsLive: {} },
    { name: "ingredient_cost", costsLive: {} },
    { name: "packaging_cost", costsLive: {} },
    { name: "other_cost", costsLive: {} },
    { name: "costs_sub_total", costsLive: {} },
    { name: "markup", costsLive: {} },
    { name: "sale_price_(ex_vat)", costsLive: {} },
    { name: "sale_price_(incl_vat)", costsLive: {} },
    { name: "print", costsLive: {} },
  ],
};

interface RecipeModuleProps {
  className?: string;
}

// FUNCTIONS
const formatWeight = (weight: number): number | string => {
  // RETURN e.g grams or kilograms
  const unit = weight < 1000 ? data.setting.unitMaster[0] : data.setting.unitMaster[1];
  const weightUnit =
    weight < 1000
      ? weight + " " + unit
      : weight / 1000 + (weight % 1000 > 0 && "." + (weight % 1000)) + " " + unit;
  //  TODO: need to handle mls and oz/lbs
  return weightUnit;
};

function getLiveTotal(portionSize: number, rowName: string): number {
  const [path] = data.uiElements.filter((obj) => obj.name === rowName);
  const portionValue = Number(path.costsLive[portionSize]);
  return portionValue;
}

const calcProfit = (costPrice: number, type: string, x: number): number => {
  let m: number = 0;
  if (type === "markup") m = calcMarkup(costPrice, x);
  if (type === "margin") m = calcMarkup(costPrice, x);
  if (type === "xcost") m = calcXCost(costPrice, x);
  return m - costPrice;
};

function replace_(text: string): string {
  return text.split("_").join(" ");
}

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  let i;
  let head;
  let cells: ReactElement[] = [];

  const getGridCss = () => {
    // COLUMNS COUNT BASED ON PORTION SIZE OPTIONS
    const rows = "_1fr".repeat(data.portions.length);
    // console.log("should b 4", rows);
    const g = ` grid justify-center grid-cols-[3fr${rows}] gap-y-4`;
    // const g = ` grid bg-red-300 justify-center grid-cols-[2fr_${rows}] gap-y-4`;
    return g;
  };
  // const g = ` grid justify-center grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-y-4`;
  // const g = ` grid justify-center grid-cols-[2fr_repeat(${data.portions.length},1fr)] gap-y-4`;

  const [viewPrices, setViewPrices] = useState(false);

  function handleViewPrices() {
    // e.preventDefault();
    setViewPrices(!viewPrices);
  }

  return (
    <DottedBorder className=" grid grid-cols-1 justify-items-center">
      <Row_EditOrProduction data={data} />
      <Row_Heading data={data} />
      <form action="#">
        <div className={getGridCss()}>
          {data.uiElements.map((uiElement, rowNum) => {
            const uiName = uiElement.name;
            switch (uiName) {
              // CONTROLS
              case "controls":
                head = (
                  <Table_Cell
                    className="col-span-2"
                    firstCol={false}
                    header={false}
                    type="controls"
                    iconName=""
                    key={uiName + "_" + rowNum}
                  >
                    <div className="flex gap-x-2">
                      {/* SHOW PRICES BUTTON */}
                      <Pill
                        tone="white"
                        className="text-xs"
                        iconName={viewPrices ? "visibility_off" : "visibility"}
                        edit=""
                        onClick={() => {
                          handleViewPrices();
                        }}
                      >
                        {viewPrices ? "Hide Prices" : "Show Prices"}
                      </Pill>
                    </div>
                  </Table_Cell>
                );

                return [head];

              // ASSEMBLY
              case "plating":
                head = (
                  <Table_Cell
                    firstCol={true}
                    header={true}
                    type=""
                    iconName="category"
                    key={uiName + "_" + rowNum}
                  >
                    {uiName}
                  </Table_Cell>
                );
                cells = data.portions.map((portion, col) => (
                  <Table_Cell header={true} type="" key={uiName + "_" + rowNum + "_" + col}>
                    {formatWeight(portion)}
                  </Table_Cell>
                ));
                return [head, ...cells];

              // COMPONENTS FOR PLATING
              case "components":
                cells = [];

                //   RESET LiveCost Values
                for (const portionSize of data.portions) {
                  // RESET LIVE CALCULATED VALUES
                  data.uiElements[rowNum].costsLive[portionSize] = 0;
                }

                // COMPONENTS - PLATING ELEMENTS
                for (i = 0; i < data.components.length; i++) {
                  const component = data.components[i];
                  // FIRST COLUMN
                  cells.push(
                    <Table_Cell
                      firstCol={true}
                      rowNum={i}
                      type="component"
                      key={uiName + "_" + rowNum + "_" + i}
                    >
                      <div> {replace_(component.name)}</div>
                    </Table_Cell>
                  );

                  // OTHER COLUMNS - COMPONENTS
                  for (let portionSize of data.portions) {
                    const currentCost = component.ingredientCosts[portionSize];
                    const livePath = data.uiElements[rowNum].costsLive;
                    // ACCUMULATE Cost Total
                    let liveCostAcc = livePath[portionSize] ?? 0;
                    livePath[portionSize] = liveCostAcc + currentCost;

                    cells.push(
                      <Table_Cell
                        type="component"
                        rowNum={i}
                        key={component.name + "_" + uiName + "_" + rowNum + "_" + portionSize}
                        className=""
                      >
                        <div>{formatWeight(component.portions[portionSize])}</div>

                        {viewPrices && (
                          <div>
                            ({data.setting.currency}
                            {currentCost})
                          </div>
                        )}
                      </Table_Cell>
                    );
                  }
                }
                return cells;

              case "ingredient_cost":
                // FIRST COLUMN
                cells = [
                  <Table_Cell type="sub_total" firstCol={true} key={uiName + "_" + rowNum + "_"}>
                    <div>{replace_(uiName)}</div>
                  </Table_Cell>,
                ];

                // OTHER COLUMNS
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];

                  const componentIngredientTotalCost = getLiveTotal(portionSize, "components");
                  cells.push(
                    <Table_Cell
                      type="sub_total"
                      key={uiName + "_" + rowNum + "_" + portionSize}
                      className=""
                    >
                      <div>{data.setting.currency}</div>
                      <div>{componentIngredientTotalCost.toFixed(2)}</div>
                    </Table_Cell>
                  );

                  // LIVE COSTS - INGREDIENT COST
                  data.uiElements[rowNum].costsLive[portionSize] = componentIngredientTotalCost;
                }

                /** MANUAL CALC - EXAMPLE
                let componentIngredientCost = 0;
                for (let ii = 0; ii < data.components.length; ii++) {
                  componentIngredientCost +=
                    data.components[ii].ingredientCosts[portionSize];
                } */

                return [...cells];

              case "packaging_cost":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} key={uiName + "_" + rowNum + "_"}>
                    <div> {replace_(uiName)}</div>
                  </Table_Cell>,
                ];
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];

                  // OTHER COLUMNS
                  cells.push(
                    <Table_Cell key={uiName + "_" + rowNum + "_" + i} className="">
                      <div>Id:</div>
                      <div>{data.packagingCostsId[portionSize]}</div>
                      <div>
                        ({data.setting.currency}
                        {data.costRules.packagingCosts[
                          data.packagingCostsId[portionSize]
                        ].cost.toFixed(2)}
                        )
                      </div>
                    </Table_Cell>
                  );
                  // LIVE COSTS - PACKAGING COSTS
                  data.uiElements[rowNum].costsLive[portionSize] =
                    data.costRules.packagingCosts[data.packagingCostsId[portionSize]].cost;
                }

                return [...cells];

              case "other_cost":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} key={uiName + "_" + rowNum + "_"}>
                    <div>{replace_(uiName)}</div>
                  </Table_Cell>,
                ];
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];

                  // OTHER COLUMNS
                  cells.push(
                    <Table_Cell key={uiName + "_" + rowNum + "_" + i} className="">
                      <div>Id:{data.otherCostsId[data.portions[i]]}</div>

                      <div>
                        {data.setting.currency}
                        {data.costRules.otherCosts[data.otherCostsId[data.portions[i]]].costs
                          .reduce((acc, cost) => (acc = acc + cost.cost), 0)
                          .toFixed(2)}
                      </div>
                    </Table_Cell>
                  );
                  // LIVE COSTS - OTHER COSTS
                  data.uiElements[rowNum].costsLive[portionSize] = data.costRules.otherCosts[
                    data.otherCostsId[data.portions[i]]
                  ].costs.reduce((acc, cost) => (acc = acc + cost.cost), 0);
                }
                console.log(data.uiElements);
                return [...cells];

              case "costs_sub_total":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} type="sub_total" key={uiName + "_" + rowNum + "_"}>
                    <div>{replace_(uiName)}</div>
                  </Table_Cell>,
                ];

                // OTHER COLUMMS - PORTIONS (100g, 350g)
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];

                  /** MANUAL EXAMPLE
                    salesPriceExVat +=
                    data.costRules.packagingCosts[
                    data.packagingCostsId[portionSize]
                    ].cost;
                */

                  const ingredientCost = getLiveTotal(portionSize, "ingredient_cost");
                  const packagingCost = getLiveTotal(portionSize, "packaging_cost");
                  const otherCost = getLiveTotal(portionSize, "other_cost");

                  const salesPriceExVat = ingredientCost + packagingCost + otherCost;
                  cells.push(
                    <Table_Cell type="sub_total" key={uiName + "_" + rowNum + "_" + i} className="">
                      <div>{data.setting.currency}</div>
                      <div>{salesPriceExVat.toFixed(2)}</div>
                    </Table_Cell>
                  );
                  // LIVE COSTS - OTHERCOST
                  data.uiElements[rowNum].costsLive[portionSize] = salesPriceExVat;
                }
                return [...cells];

              case "markup":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} key={uiName + "_" + rowNum + "_"}>
                    <div>{replace_(uiName)}</div>
                  </Table_Cell>,
                ];

                // GET MARKUP RULE
                for (let i = 0; i < data.portions.length; i++) {
                  /// PACKAGING RULES
                  let markupRuleId = data.markupId[data.portions[i]];
                  let markupRuleName = data.costRules.markUps[markupRuleId].name;
                  let markupRuleFactor = data.costRules.markUps[markupRuleId].factor;
                  let markupRuleType = data.costRules.markUps[markupRuleId].type;

                  const portionSize = data.portions[i];
                  let salesPriceExVat = 0;

                  // COMPONENENTS LOOP - MARKUP
                  for (let ii = 0; ii < data.components.length; ii++) {
                    // COMPONENT INGREDIENT COSTS
                    salesPriceExVat += data.components[ii].ingredientCosts[portionSize];
                  }
                  // PACKAGING COSTS
                  salesPriceExVat +=
                    data.costRules.packagingCosts[data.packagingCostsId[portionSize]].cost;
                  // OTHER COSTS
                  salesPriceExVat += data.costRules.otherCosts[
                    data.otherCostsId[portionSize]
                  ].costs.reduce((acc, cost) => (acc = acc + cost.cost), 0);

                  const salesPriceWithMarkup = calcProfit(
                    salesPriceExVat,
                    markupRuleType,
                    markupRuleFactor
                  );
                  // OTHER COLUMNS
                  cells.push(
                    <Table_Cell
                      key={uiName + "_" + rowNum + "_" + i}
                      className="flex gap-y-1 flex-col"
                    >
                      <div>
                        {data.setting.currency}
                        {salesPriceWithMarkup.toFixed(2)}
                      </div>
                      {/* <div>{markupRuleName}</div> */}
                      {/* <div className="text-sm flex leading-[0]">
                        <div>F:{markupRuleFactor}</div>
                        <div>T:{markupRuleType}</div>
                      </div> */}
                    </Table_Cell>
                  );
                  // LIVE COSTS - OTHERCOST
                  data.uiElements[rowNum].costsLive[portionSize] = salesPriceWithMarkup;
                }
                return [...cells];

              case "sale_price_(ex_vat)":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} type="sub_total" key={uiName + "_" + rowNum + "_"}>
                    <div> {replace_(uiName)}</div>
                  </Table_Cell>,
                ];
                // OTER COLUMNS
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];
                  const costsSubTotal = getLiveTotal(portionSize, "costs_sub_total");
                  const markup = getLiveTotal(portionSize, "costs_sub_total");
                  const salesPriceExVat = costsSubTotal + markup;

                  cells.push(
                    <Table_Cell type="sub_total" key={uiName + "_" + rowNum + "_" + i} className="">
                      <div>{data.setting.currency}</div>
                      <div>{salesPriceExVat.toFixed(2)}</div>
                    </Table_Cell>
                  );
                  // LIVE COSTS - SALES PRICE EX VAT
                  data.uiElements[rowNum].costsLive[portionSize] = salesPriceExVat;
                }
                return [...cells];

              case "sale_price_(incl_vat)":
                // FIRST COLUMN
                cells = [
                  <Table_Cell firstCol={true} type="total" key={uiName + "_" + rowNum + "_"}>
                    <div> {replace_(uiName)}</div>
                  </Table_Cell>,
                ];
                // OTHER COLUMNS
                for (let i = 0; i < data.portions.length; i++) {
                  const portionSize = data.portions[i];
                  const salesPriceIncVat =
                    getLiveTotal(portionSize, "sale_price_(ex_vat)") * (1 + data.setting.vat);

                  cells.push(
                    <Table_Cell type="total" key={uiName + "_" + rowNum + "_" + i} className="">
                      <div>{data.setting.currency}</div>
                      <div>{salesPriceIncVat.toFixed(2)}</div>
                    </Table_Cell>
                  );
                  // LIVE COSTS - SALES PRICE EX VAT
                  data.uiElements[rowNum].costsLive[portionSize] = salesPriceIncVat;
                }
                return [...cells];

              case "print":
                // FIRST COLUMN
                head = [<Table_Cell key={uiName + "_" + rowNum + "_"}> </Table_Cell>];
                // OTHER COLUMNS
                cells = data.portions.map((portion, count) => (
                  <Table_Cell type="print" key={uiName + "_" + rowNum + "_" + count} className="">
                    <div>
                      {
                        <SvgSpriteLink
                          key={`print_${String(portion)}  + "_" + rowNum`}
                          size={30}
                          link={""}
                          iconName="print"
                          className=""
                        />
                      }
                    </div>
                  </Table_Cell>
                ));
                return [...[head], ...cells];

              default:
                // FIRST COLUMN
                head = [<Table_Cell key={uiName + "_" + rowNum + "_"}>{uiName}</Table_Cell>];
                // OTHER COLUMNS
                cells = data.portions.map((portion, count) => (
                  <Table_Cell key={uiName + "_" + rowNum + "_" + count}>{uiName}</Table_Cell>
                ));
                return [...head, ...cells];
            }
          })}
        </div>
      </form>
    </DottedBorder>
  );
};

export default RecipeModule;
