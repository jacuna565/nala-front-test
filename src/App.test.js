import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Renders correctly", () => {
  const { getByLabelText } = render(<App />);
  const TextElement = getByLabelText("Pick the Excel file");
  expect(TextElement).toBeInTheDocument();
});
