import React from "react";
import ReactDOM from "react-dom";
import ListCoins from "./ListCoins";

describe("Testing ListCoins component", () => {
  it("Should render ListCoins component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListCoins />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
