import React from "react";
import { render } from "@testing-library/react";
import TablePreview from "./index";

it("Renders correctly", () => {
  const {queryByTestId} = render(<TablePreview />);
  expect(queryByTestId("table-container")).toBeTruthy();
})