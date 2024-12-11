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
import SvgSpriteLink from "./SvgSpriteLink";
import {
  calcMarkup,
  calcProfit,
  calcXCost,
  formatWeight,
  getLiveTotal,
  replace_,
} from "@/lib/utils";
import Table_Cell from "./Table_Cell";
import MenuOption1 from "./MenuOption1";
import MenuOption2 from "./MenuOption2";
import { RecipeModuleProps, data, recipeDetailProps, recipeeUI } from "@/app/data/recipe";
import Row_SubRecipeControls from "./Row_SubRecipeControls";
import Row_SubRecipeSubInfo from "./Row_SubRecipeSubInfo";
import Row_SubRecipeIngredient from "./Row_SubRecipeIngredient";
import Row_SubRecipeHeader from "./Row_SubRecipeHeader";

// PAGE
const RecipeModule: React.FC<RecipeModuleProps> = () => {
  let i;
  let head;
  let cells: ReactElement[] = [];

  const [viewPrices, setViewPrices] = useState(false);

  function handleViewPrices() {
    // e.preventDefault();
    setViewPrices(!viewPrices);
  }

  return (
    <>
      <DottedBorder className=" grid grid-cols-1 justify-items-center mb-8">
        <Row_EditOrProduction data={data} />
        <Row_Heading data={data} />
        <form action="#">
          {/* CREATE PLASTING TABLE */}
          <div
            // DYNAMICALLY CREATE COLUMN BASED ON ELEMENT COUNT
            className={`grid justify-center gap-y-2 gap-x-2`}
            style={{ gridTemplateColumns: `2fr repeat(${data.portions.length}, min-content)` }}
          >
            {data.uiElements.map((uiElement, rowNum) => {
              const uiName = uiElement.name;
              switch (uiName) {
                // CONTROLS
                case "controls":
                  head = (
                    <Table_Cell
                      firstCol={false}
                      header={false}
                      type="controls"
                      iconName=""
                      key={uiName + "_" + rowNum}
                    >
                      {/* SHOW PRICES BUTTON */}

                      {/* <Pill
                        tone="white"
                        className="text-xs"
                        iconName={viewPrices ? "visibility_off" : "visibility"}
                        edit=""
                        onClick={() => {
                          handleViewPrices();
                        }}
                      >
                        {viewPrices ? "Hide Prices" : "Show Prices"}
                      </Pill> */}

                      <MenuOption1>button 1</MenuOption1>
                      <MenuOption2>butt 2</MenuOption2>
                      <MenuOption2>
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
                      </MenuOption2>
                    </Table_Cell>
                  );
                  return [head];

                // ASSEMBLY / PLATING / COMPONENTS / ELEMENTS
                case "plating":
                  head = (
                    <Table_Cell
                      firstCol={true}
                      header={true}
                      type="plating"
                      iconName="category"
                      key={uiName + "_" + rowNum}
                    >
                      <span>{uiName}</span>
                    </Table_Cell>
                  );
                  // PLATING QTY
                  cells = data.portions.map((portion, col) => (
                    <Table_Cell
                      header={true}
                      type="plating"
                      key={uiName + "_" + rowNum + "_" + col}
                    >
                      {formatWeight(portion)}
                    </Table_Cell>
                  ));
                  return [head, ...cells];

                // COMPONENTS FOR PLATING
                case "components":
                  cells = [];

                  // RESET LIVE CALCULATED VALUES
                  for (const portionSize of data.portions) {
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
                        {replace_(component.name)}
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
                          {formatWeight(component.portions[portionSize])}

                          {viewPrices && (
                            <div className="text-[10px] self-center">
                              {data.setting.currency}
                              {currentCost}
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
                      {replace_(uiName)}
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
                        {data.setting.currency}
                        {componentIngredientTotalCost.toFixed(2)}
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
                      {replace_(uiName)}
                    </Table_Cell>,
                  ];
                  for (let i = 0; i < data.portions.length; i++) {
                    const portionSize = data.portions[i];

                    // OTHER COLUMNS
                    cells.push(
                      <Table_Cell key={uiName + "_" + rowNum + "_" + i} className="">
                        {data.setting.currency}
                        {data.costRules.packagingCosts[
                          data.packagingCostsId[portionSize]
                        ].cost.toFixed(2)}

                        {viewPrices && (
                          <div className="text-[10px] self-center">
                            <div>Id:{data.packagingCostsId[portionSize]}</div>
                          </div>
                        )}
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
                      {replace_(uiName)}
                    </Table_Cell>,
                  ];
                  for (let i = 0; i < data.portions.length; i++) {
                    const portionSize = data.portions[i];

                    // OTHER COLUMNS
                    cells.push(
                      <Table_Cell key={uiName + "_" + rowNum + "_" + i} className="">
                        {data.setting.currency}
                        {data.costRules.otherCosts[data.otherCostsId[data.portions[i]]].costs
                          .reduce((acc, cost) => (acc = acc + cost.cost), 0)
                          .toFixed(2)}

                        {viewPrices && (
                          <div className="text-[10px] self-center">
                            Id:{data.otherCostsId[data.portions[i]]}
                          </div>
                        )}
                      </Table_Cell>
                    );
                    // LIVE COSTS - OTHER COSTS
                    data.uiElements[rowNum].costsLive[portionSize] = data.costRules.otherCosts[
                      data.otherCostsId[data.portions[i]]
                    ].costs.reduce((acc, cost) => (acc = acc + cost.cost), 0);
                  }
                  // console.log(data.uiElements);
                  return [...cells];

                case "costs_sub_total":
                  // FIRST COLUMN
                  cells = [
                    <Table_Cell firstCol={true} type="sub_total" key={uiName + "_" + rowNum + "_"}>
                      {replace_(uiName)}
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
                      <Table_Cell
                        type="sub_total"
                        key={uiName + "_" + rowNum + "_" + i}
                        className=""
                      >
                        {data.setting.currency}
                        {salesPriceExVat.toFixed(2)}
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
                      {replace_(uiName)}
                    </Table_Cell>,
                  ];
                  // OTER COLUMNS
                  for (let i = 0; i < data.portions.length; i++) {
                    const portionSize = data.portions[i];
                    const costsSubTotal = getLiveTotal(portionSize, "costs_sub_total");
                    const markup = getLiveTotal(portionSize, "costs_sub_total");
                    const salesPriceExVat = costsSubTotal + markup;

                    cells.push(
                      <Table_Cell
                        type="sub_total"
                        key={uiName + "_" + rowNum + "_" + i}
                        className=""
                      >
                        {data.setting.currency}
                        {salesPriceExVat.toFixed(2)}
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
                        {data.setting.currency}
                        {salesPriceIncVat.toFixed(2)}
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

                // method
                case "method":
                  head = (
                    <Table_Cell
                      className="flex"
                      firstCol={false}
                      header={false}
                      type="method"
                      iconName="info"
                      key={uiName + "_" + rowNum}
                    >
                      <p className=" line-clamp-3">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries, but also the
                        leap into electronic typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </Table_Cell>
                  );
                  return [head];

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
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}
      {/* SUB RECIPES */}

      {data.components.map((subRecipe, iSub) => {
        const totalWeight = subRecipe.recipe.recipeDetail.reduce((acc, v) => (acc += v.qty), 0);

        return (
          <DottedBorder
            key={"recipe_" + iSub + "_" + subRecipe.name}
            className=" grid grid-cols-1 justify-center mb-8"
          >
            <div
              className={`grid gap-y-2 gap-x-2`}
              style={{
                gridTemplateColumns: `2fr repeat(${recipeeUI.sub_recipe.length - 1}, max-content)`,
              }}
            >
              <Row_SubRecipeControls subRecipeId={iSub} />
              <Row_SubRecipeSubInfo subRecipeId={iSub} />
              <Row_SubRecipeHeader />

              {/* SHOW INGREDIENTS */}
              {data.components[iSub].recipe.recipeDetail.map((ingredient) => (
                <Row_SubRecipeIngredient
                  key={Math.random()}
                  ingredient={ingredient}
                  totalWeight={totalWeight}
                />
              ))}
              <Table_Cell type="controls">
                <Pill tone="dark" iconName="add_circle">
                  Add
                </Pill>
              </Table_Cell>
              <Table_Cell
                className=""
                firstCol={false}
                header={false}
                type="method"
                iconName="info"
                key={subRecipe.name + "_" + iSub}
              >
                <div className=" line-clamp-3">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </div>
              </Table_Cell>
            </div>
          </DottedBorder>
        );
      })}
    </>
  );
};

export default RecipeModule;
