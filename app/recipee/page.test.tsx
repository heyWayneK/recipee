import { render, screen } from "@testing-library/react";
import { MenuModalProvider } from "../../contexts/useMenuModal";
import { RecipeDataProvider } from "../../contexts/useRecipeData";
import Recipee from "./page";
import "@testing-library/jest-dom";
import React from "react";
import { LightDarkThemeProvider } from "@/contexts/useThemeDarkLight";

// INFO: ignore the errors on describe and expect. Its a known issue with Jest and TypeScript (I think)
// INFO: It will works even with the errors

describe("Recipee", () => {
  // INFO: It will works even with the Jest errors
  it("renders 'test-1234' in the bottom div", () => {
    const theme = "light"; // Define the theme value
    render(
      //   <MenuModalProvider>
      //     <RecipeDataProvider>
      <LightDarkThemeProvider>
        <Recipee />
      </LightDarkThemeProvider>
      //     </RecipeDataProvider>
      //   </MenuModalProvider>
    );

    const bottomDiv = screen.getByTestId("test");
    // INFO: It will works even with the Jest errors
    expect(bottomDiv).toBeInTheDocument();
    expect(bottomDiv).toHaveTextContent("test-1234");
  });
});
