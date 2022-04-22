import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../index";

test("Should login components", async () => {
  render(<Login />);

  // heading text
  const header_title = screen.findByText("login");
  expect(await header_title).toBeInTheDocument();
});
