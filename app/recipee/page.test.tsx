import { render, screen } from "@testing-library/react";
import { MenuModalProvider } from "../../contexts/UseMenuModal";
import { RecipeDataProvider } from "../../contexts/UseRecipeData";
import Recipee from "./page";
import "@testing-library/jest-dom";
import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import your ThemeContext

// INFO: ignore the errors on describe and expect. Its a known issue with Jest and TypeScript (I think)
// INFO: It will works even with the errors

describe("Recipee", () => {
  it("renders 'test-1234' in the bottom div", () => {
    const theme = "light"; // Define the theme value
    render(
      //   <MenuModalProvider>
      //     <RecipeDataProvider>
      <ThemeContext.Provider value={{ theme }}>
        <Recipee />
      </ThemeContext.Provider>
      //     </RecipeDataProvider>
      //   </MenuModalProvider>
    );

    const bottomDiv = screen.getByTestId("test");
    expect(bottomDiv).toBeInTheDocument();
    expect(bottomDiv).toHaveTextContent("test-1234");
  });
});
