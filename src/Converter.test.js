import React from "react";
import ReactDOM from "react-dom";
import Converter from "./Converter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

describe("Testing Converter component", () => {
  it("Should render Converter component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Converter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
