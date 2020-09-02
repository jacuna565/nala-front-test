import React from "react";
import { render } from "@testing-library/react";
import Button from "./index";

it("Renders correctly", () => {
  const {queryByTestId} = render(<Button />);
  expect(queryByTestId("button-container")).toBeTruthy();
})