import { render, screen } from "@testing-library/react";
import { RecipeDataProvider } from "@/contexts/UseRecipeData";
import Recipee from "./page";
import "@testing-library/jest-dom";
import React from "react";
import { DarkLightThemeProvider } from "@/contexts/useThemeDarkLight";
import { useRecipeDataStore } from "@/hooks/useRecipeDataStore";
import { MenuModalProvider } from "@/contexts/UseMenuModal";

jest.mock('@/hooks/useRecipeDataStore');

describe("Recipee", () => {
  it("renders without crashing", () => {
    (useRecipeDataStore as jest.Mock).mockReturnValue({
      recipeData: {
        portionSizes: [1],
        data: {
          components: [],
          portions: [],
        },
        name: "Test Recipe",
        componentsWeights: [],
        componentsNamesArray: [],
        componentsPricePer1000g: [],
        componentsPrices: [],
        componentsPricesDesc: [],
        componentsSubTotalsPrices: [],
        packingCostPriceTotals: [],
        packingCostPriceRules: [],
        otherCostsPriceTotals: [],
        otherCostsPriceRules: [],
        costsSubTotals: [0],
        markUpPriceAmounts: [],
        markUpPriceRules: [1],
        markUpPriceRuleName: [],
        salePricesExVat: [],
        salesPricesIncVat: [],
        vatRuleIds: [],
        vatRulePercs: [],
        vatRuleNames: [],
      },
      systemData: {
        org: {
            unit_metric_imperial_name: 'metric'
        },
        unit_metric_imperial: [],
        markup: [{ id: 1, name: "Test Markup", factor: 1.2, markup_type: { name: "markup" } }]
      },
      loaded: true,
      fetchData: jest.fn(),
      qty: 1,
      localOrDbData: {
        system: "database",
        recipe: "database",
      },
    });

    render(
      <MenuModalProvider>
        <DarkLightThemeProvider>
          <RecipeDataProvider>
            <Recipee />
          </RecipeDataProvider>
        </DarkLightThemeProvider>
      </MenuModalProvider>
    );
    // The test will pass if the component renders without throwing an error.
  });
});
