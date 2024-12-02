import React, { ReactElement } from "react";
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

export interface DataProps {
  portions: number[];
  setting: {
    unitMaster: string;
    unitMask: string;
    vat: number;
    currency: string;
    locale: string;
  };
  costRules: CostRules;
  elements: ElementProps[];
  uiElements: UIElement[];
  packagingCosts: { [key: number]: number };
  otherCosts: { [key: number]: number };
  markup: { [key: number]: number };
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
  type: "markup" | "margin" | "x cost";
}

interface nutriPer100Props {
  name: string;
  valuePer100: number;
  unit: string;
}

interface ElementProps {
  name: string;
  id: number;
  subType: "ingredient" | "recipe";
  recipeId: number | null;
  ingredientId: number | null;
  portions: { [key: number]: number };
  ingredientCosts: { [key: number]: number };
  yield: number;
  nutriPer100: nutriPer100Props[];
}

interface UIElement {
  name: string;
  reactComponent: string;
}

const data: DataProps = {
  setting: {
    unitMaster: "g",
    // unitMaster: "g/kg",
    unitMask: "none",
    vat: 15,
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
          { name: "Film 350g", cost: 1.43, id: 730 },
          { name: "Small Sticker", cost: 0.32, id: 356 },
          { name: "Lid Sticker", cost: 0.32, id: 859 },
          { name: "Share of Box", cost: 0.75, id: 529 },
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
      8: { name: "2x", factor: 2, type: "x cost" },
      9: { name: "2.5x", factor: 2.5, type: "x cost" },
    },
  },
  portions: [100, 275, 350, 1000],
  packagingCosts: { 100: 2, 275: 2, 350: 1, 1000: 4 },
  otherCosts: { 100: 0, 275: 1.34, 350: 1.98, 1000: 2.38 },
  markup: { 100: 1, 275: 3, 350: 9, 1000: 8 },
  elements: [
    {
      name: "Cheese Cheddar",
      id: 101235,
      subType: "ingredient",
      recipeId: null,
      ingredientId: 4567,
      portions: { 100: 30, 275: 75, 350: 150, 1000: 350 },
      ingredientCosts: { 100: 10.66, 275: 13.43, 350: 15.7, 1000: 31.88 },
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
      recipeId: 986,
      ingredientId: null,
      portions: { 100: 10, 275: 28, 350: 35, 1000: 120 },
      ingredientCosts: { 100: 10.66, 275: 13.43, 350: 15.7, 1000: 31.88 },

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
      name: "Master - FC Potato Mash",
      id: 1012456,
      subType: "recipe",
      recipeId: 6759,
      ingredientId: null,
      portions: { 100: 100, 275: 100, 350: 150, 1000: 350 },
      ingredientCosts: { 100: 10.66, 275: 13.43, 350: 15.7, 1000: 31.88 },

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
      ingredientId: null,
      portions: { 100: 30, 275: 80, 350: 95, 1000: 300 },
      ingredientCosts: { 100: 10.66, 275: 13.43, 350: 15.7, 1000: 31.88 },

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
      ingredientId: 568,
      portions: { 100: 1, 275: 2, 350: 3, 1000: 5 },
      ingredientCosts: { 100: 10.66, 275: 13.43, 350: 15.7, 1000: 31.88 },

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
    { name: "assembly", reactComponent: "<Row_Heading>" },
    { name: "components", reactComponent: "<Row_ElementsList>" },
    { name: "ingredient_cost", reactComponent: "<Row_IngredientCost>" },
    { name: "packaging", reactComponent: "<Row_PackagingCost>" },
    { name: "other", reactComponent: "<Row_OtherCost>" },
    { name: "markup", reactComponent: "<Row_Markup>" },
    { name: "sale_price_(ex_vat)", reactComponent: "<Row_SalePriceExVat>" },
    { name: "sale_price_(incl_vat)", reactComponent: "<Row_SalePriceIncVat>" },
    { name: "print", reactComponent: "<Row_Print>" },
  ],
};

interface RecipeModuleProps {
  className?: string;
}

//TODO:  Move to utils file later
const formatWeight = (weight: number): number | string => {
  const unit = data.setting.unitMaster;
  return weight;
};

const RecipeModule: React.FC<RecipeModuleProps> = ({ className = "" }) => {
  // Create the correct amount of columns
  const colCount = Number(data.portions.length + 1);
  let head;
  let cells: ReactElement[] = [];
  return (
    <DottedBorder className="grid grid-cols-1 justify-items-center">
      <Row_EditOrProduction data={data} />
      <Row_Heading data={data} />
      <div
        className={`grid 
        grid-cols-[repeat(${colCount},minmax(0,1fr))]
      gap-2 border`}
      >
        {data.uiElements.map((obj) => {
          // Loop through rows in UiElements
          switch (obj.name) {
            case "assembly":
              head = (
                <Pill tone="dark" iconName="category" key={obj.name}>
                  {obj.name}
                </Pill>
              );
              cells = data.portions.map((obj) => <Pill key={obj}>{obj}</Pill>);
              return [head, ...cells];

            case "components":
              cells = [];
              // How many Elements/Components in Recipe
              for (const element of data.elements) {
                cells.push(
                  <TextLink key={element.name}>{element.name}</TextLink>
                );
                for (const portion of data.portions) {
                  cells.push(
                    <TextLink key={portion} className="flex gap-1">
                      <div>
                        {formatWeight(Number(element.portions[portion]))}
                      </div>
                      <div>{data.setting.unitMaster}</div>
                    </TextLink>
                  );
                }
              }
              return cells;

            case "ingredient_cost":
              cells = [<Pill key={obj.name}>{obj.name}</Pill>];

              for (let i = 0; i < data.portions.length; i++) {
                const portionSize = data.portions[i];
                let componentIngredientCost = 0;
                for (let ii = 0; ii < data.elements.length; ii++) {
                  componentIngredientCost +=
                    data.elements[ii].ingredientCosts[portionSize];
                }
                cells.push(
                  <TextLink key={data.portions[i]} className="flex gap-1">
                    <div>{data.setting.currency}</div>
                    <div>{componentIngredientCost}</div>
                  </TextLink>
                );
              }
              return [...cells];

            case "packaging":
              cells = [<Pill key={obj.name}>{obj.name}</Pill>];
              for (let i = 0; i < data.portions.length; i++) {
                // Get packaging cost by portion size
                cells.push(
                  <TextLink key={data.portions[i]} className="flex gap-1">
                    <div>{data.packagingCosts[data.portions[i]]}</div>
                    <div>{data.setting.unitMaster}</div>
                  </TextLink>
                );
              }
              return [...cells];

            case "other":
              cells = [<Pill key={obj.name}>{obj.name}</Pill>];
              for (let i = 0; i < data.portions.length; i++) {
                // Get packaging cost by portion size
                cells.push(
                  <TextLink key={data.portions[i]} className="flex gap-1">
                    <div>{data.markup[data.portions[i]]}</div>
                    <div>{data.setting.unitMaster}</div>
                  </TextLink>
                );
              }
              return [...cells];

            case "markup":
              cells = [<Pill key={obj.name}>{obj.name}</Pill>];
              for (let i = 0; i < data.portions.length; i++) {
                // Get packaging cost by portion size
                const markupRuleId = data.markup[data.portions[i]];
                cells.push(
                  <TextLink key={data.portions[i]} className="flex gap-1">
                    <div>{data.costRules.markUps[markupRuleId].name}</div>
                    <div>{data.costRules.markUps[markupRuleId].factor}</div>
                    <div>{data.costRules.markUps[markupRuleId].type}</div>
                    {/* <div>Rule: {markupRuleId}</div> */}
                  </TextLink>
                );
              }
              return [...cells];

            case "print":
              head = [<Pill key={obj.name}>{obj.name}</Pill>];
              cells = data.portions.map((portion) => (
                <SvgSpriteLink
                  key={`print_${String(portion)}`}
                  size={30}
                  link={""}
                  iconName="print"
                  className=""
                />
              ));
              return [...[head], ...cells];

            default:
              head = [<Pill key={obj.name}>{obj.name}</Pill>];
              cells = data.portions.map((portion) => (
                <Pill key={obj.name}>{obj.name}</Pill>
              ));
              return [...head, ...cells];
          }
        })}
      </div>
      {/* <Row_IngredientCost data={data} />
      <Row_PackagingCost data={data} />
      <Row_OtherCost data={data} />
      <Row_Markup data={data} />
      <Row_SalePriceExVat data={data} />
      <Row_SalePriceIncVat data={data} />
      <Row_Print data={data} /> */}
    </DottedBorder>
  );
};

export default RecipeModule;
