import React from "react";
import { render } from "@testing-library/react";
import OrganizationChart from "./index";

it("Renders correctly", () => {
  const {queryByTestId} = render(<OrganizationChart />);
  expect(queryByTestId("organization-container")).toBeTruthy();
})