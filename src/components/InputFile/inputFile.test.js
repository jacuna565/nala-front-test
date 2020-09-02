import React from "react";
import { render } from "@testing-library/react";
import InputFile from "./index";

it("Renders correctly", () => {
  const {queryByTestId} = render(<InputFile />);
  expect(queryByTestId("input-container")).toBeTruthy();
})