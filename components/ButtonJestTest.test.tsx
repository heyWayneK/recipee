import { render, screen } from "@testing-library/react";
import ButtonTestJest from "@/components/ButtonJestTest";
import React from "react";

// INFO: ignore the errors on describe and expect. Its a known issue with Jest and TypeScript (I think)

describe("Button", () => {
  it("renders with text", () => {
    render(<ButtonTestJest>Click me</ButtonTestJest>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
